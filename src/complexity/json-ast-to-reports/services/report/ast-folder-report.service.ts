import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { RowFolderReport } from '../../models/report/row-folder-report.model';
import { RowFileReport } from '../../models/report/row-file-report.model';
import {
    createRelativeDir,
    getFilenameWithoutExtension,
    getPathWithSlash,
    getRouteToRoot
} from '../../../core/services/file.service';
import { MethodReport } from '../../models/report/method-report.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFolderService } from '../ast/ast-folder.service';
import { Options } from '../../../core/models/options.model';

/**
 * Service generating folders reports
 */
export class AstFolderReportService {

    astFolder: AstFolder = undefined;                                       // The AstFolder relative to this service
    astFolderService: AstFolderService = new AstFolderService();            // The service relative to AstFolders
    private filesArray: RowFileReport[] = [];                               // The array of files reports
    private foldersArray: RowFolderReport[] = [];                           // The array of subfolders reports
    private isRootFolder = false;                                           // True if the AstFolder relative to this service is the root folder of the analysis
    private methodsArray: RowFileReport[] = [];                             // The array of methods reports
    private relativeRootReports = '';                                       // The route between the pos of the current TsFolder and the root of the analysis
    template: HandlebarsTemplateDelegate;                                   // The HandleBar template used to generate the report


    constructor(astFolder: AstFolder) {
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }


    /**
     * Returns the array of subfolders with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    getFoldersArray(astFolder: AstFolder): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        if (getPathWithSlash(this.astFolder.path) !== getPathWithSlash(Options.pathFolderToAnalyze)) {
            report.push(this.addRowBackToParentFolder());
        }
        return report.concat(this.getSubfoldersArray(astFolder));
    }


    /**
     * Recursion returning the array of subfolders reports
     * @param astFolder        // The AstFolder to analyse
     * @param isSubfolder       // True if astFolder is a subfolder (used for recursivity)
     */
    getSubfoldersArray(astFolder: AstFolder, isSubfolder = false): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        for (const subfolder of astFolder.children) {
            if (subfolder.relativePath !== '') {
                const subfolderReport: RowFolderReport = {
                    complexitiesByStatus: subfolder.stats?.numberOfMethodsByStatus,
                    numberOfFiles: subfolder.stats?.numberOfFiles,
                    numberOfMethods: subfolder.stats?.numberOfMethods,
                    path: subfolder.relativePath,
                    routeFromCurrentFolder: this.astFolderService.getRouteFromFolderToSubFolder(this.astFolder, subfolder)
                };
                report.push(subfolderReport);
            }
            if (!isSubfolder) {
                report = report.concat(this.getSubfoldersArray(subfolder, true));
            }
        }
        return report;
    }


    /**
     * Adds a backLink to the parent folder
     */
    addRowBackToParentFolder(): RowFolderReport {
        return {
            complexitiesByStatus: undefined,
            numberOfFiles: undefined,
            numberOfMethods: undefined,
            path: '../',
            routeFromCurrentFolder: '..'

        };
    }


    /**
     * Returns the array of files with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    getFilesArray(astFolder: AstFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const tsFile of astFolder.astFiles) {
            for (const astMethod of tsFile.astMethods) {
                report.push({
                    cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                    cpxIndex: astMethod.cpxIndex,
                    cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: astMethod.cyclomaticCpx,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile),
                    methodName: astMethod.name
                })
            }
        }
        return report;
    }


    /**
     * Returns the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    getMethodsArraySortedByDecreasingCognitiveCpx(astFolder: AstFolder): RowFileReport[] {
        const report = this.getMethodsArray(astFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }


    /**
     * Recursion returning the array of methods reports of each subfolder
     * @param astFolder    // The AstFolder to analyse
     */
    getMethodsArray(astFolder: AstFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const subfolder of astFolder.children) {
            for (const tsFile of subfolder.astFiles) {
                for (const astMethod of tsFile.astMethods) {
                    report.push({
                        cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                        cpxIndex: astMethod.cpxIndex,
                        cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: astMethod.cyclomaticCpx,
                        filename: tsFile.name,
                        linkFile: this.getFileLink(tsFile),
                        methodName: astMethod.name
                    })
                }
            }
            report = report.concat(this.getMethodsArray(subfolder));
        }
        return report;
    }


    /**
     * The method sorting the rows of the methods report by decreasing cognitive complexity
     * @param methodsReport     // The array to sort
     */
    sortByDecreasingCognitiveCpx(methodsReport: MethodReport[]): MethodReport[] {
        return methodsReport.sort((a, b) => b.cpxIndex - a.cpxIndex);
    }


    /**
     * Returns the path to the report's page of a given AstFile
     * @param astFile
     */
    getFileLink(astFile: AstFile): string {
        if (this.astFolder.relativePath === astFile.astFolder?.relativePath) {
            return `./${getFilenameWithoutExtension(astFile.name)}.html`;
        }
        const route = this.astFolderService.getRouteFromFolderToFile(this.astFolder, astFile);
        return `${route}/${getFilenameWithoutExtension(astFile.name)}.html`;
    }


    /**
     * Generates the folder's report
     */
    generateReport(): void {
        const parentFolder: AstFolder = new AstFolder();
        parentFolder.children.push(this.astFolder);
        this.relativeRootReports = getRouteToRoot(this.astFolder.relativePath);
        this.filesArray = this.getFilesArray(this.astFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/folder-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    /**
     * Fills the HandleBar's template
     */
    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            filesArray: this.filesArray,
            foldersArray: this.foldersArray,
            isRootFolder: this.isRootFolder,
            methodsArray: this.methodsArray,
            relativeRootReports: this.relativeRootReports,
            stats: this.astFolder.stats,
            thresholds: Options.getThresholds()
        });
        if (this.astFolder.relativePath) {
            createRelativeDir(this.astFolder.relativePath);
        }
        const pathReport = `${Options.pathOutDir}/${this.astFolder.relativePath}/folder-report.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    /**
     * Registers a HandleBar's partial
     * @param partialName
     * @param filename
     */
    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
