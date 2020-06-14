import { TreeFolder } from '../../models/tree/tree-folder.model';
import { Stats } from '../../models/stats.model';
import { Language } from '../../ast/enums/language.enum';
import { AstFileService } from '../../ast/services/ast-file.service';
import { StatsService } from '../../services/report/stats.service';
import { JsonAst } from '../models/json-ast.model';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class AstFolderService {
// export class AstFolderService extends StatsService {

    protected _stats: Stats = undefined;                        // The statistics of the TreeFolder
    astFileAstService?: AstFileService = new AstFileService();  // The service managing TreeFiles
    astFileService?: AstFileService = new AstFileService();  // The service managing TreeFiles
    treeFolder: TreeFolder = undefined;                         // The TreeFolder corresponding to this service

    constructor() {
        // super();
    }


    /**
     * Generates the TreeFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     * @param language         // The extension of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The TreeFolder of a subfolder (param useful only for recursivity, should not be used outside of the method)
     */
    generateAstFolders(jsonAst: JsonAst): TreeFolder {
        console.log('JSON ASTTT', jsonAst)
        // const treeFolder: TreeFolder = new TreeFolder();
        // treeFolder.path = path;
        // treeFolder.relativePath = getRelativePath(Options.pathFolderToAnalyze, path);
        // const filesOrDirs = fs.readdirSync(path);
        // filesOrDirs.forEach((elementName: string) => {
        //     const pathElement = path + elementName;
        //     if (!Options.isIgnored(pathElement)) {
        //         this.generateFileOrDirTree(pathElement, language, treeSubFolder, treeFolder);
        //     }
        // });
        // treeFolder.evaluate();
        return;
    }


    /**
     * Generates the TreeFolder of a treeSubFolder which is a child of a given treeFolder with the path 'pathElement'
     * @param pathElement       // The path of the element
     * @param language          // The language of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The TreeFolder of a subfolder of the param treeFolder
     * @param treeFolder        // The parent TreeFolder
     */
    // private generateFileOrDirTree(pathElement: string, language: Language, treeSubFolder: TreeFolder, treeFolder: TreeFolder): void {
    //     if (fs.statSync(pathElement).isDirectory()) {
    //         let subFolder = new TreeFolder();
    //         subFolder = this.generateAstFolders(`${pathElement}/`, language, subFolder);
    //         subFolder.parent = treeSubFolder;
    //         subFolder.path = pathElement;
    //         treeFolder.subFolders.push(subFolder);
    //     } else if (!language || getLanguageExtensions(language).includes(getFileExtension(pathElement))) {
    //         if (!DEBUG || (DEBUG && pathElement === './src/complexity/mocks/debug.mock.ts')) {
    //             language = Language.PHP;
                // if (language === Language.TS) {
                //     treeFolder.treeFiles.push(this.astFileAstService.generateTsTree(pathElement, treeFolder));
                // } else {
                //     const jsonAst: JsonAst = LanguageToJsonAstService.convert(pathElement, language);
                //     treeFolder.treeFiles.push(this.astFileAstService.generateAstTree(jsonAst, treeFolder));
                // }
            // }
        // }
    // }


    /**
     * Calculates the statistics of the TreeFolder
     * @param treeFolder        // The TreeFolder to analyse
     */
    // calculateStats(treeFolder: TreeFolder): void {
    //     this._stats.numberOfFiles += treeFolder?.treeFiles?.length ?? 0;
    //     for (const file of treeFolder.treeFiles) {
    //         this.incrementFileStats(file);
    //     }
    //     for (const subFolder of treeFolder.subFolders) {
    //         this.calculateStats(subFolder);
    //     }
    // }


    /**
     * Increments TreeFolder statistics for a given treeFile
     * @param treeFile       // The TreeFile to analyse
     */
    // incrementFileStats(treeFile: TreeFile): void {
    //     if (!treeFile) {
    //         return;
    //     }
    //     let tsFileStats = treeFile.getStats();
    //     this._stats.numberOfMethods += tsFileStats.numberOfMethods;
    //     this.incrementMethodsByStatus(ComplexityType.COGNITIVE, tsFileStats);
    //     this.incrementMethodsByStatus(ComplexityType.CYCLOMATIC, tsFileStats);
    //     this._stats.barChartCognitive = BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
    //     this._stats.barChartCyclomatic = BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    // }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param type              // The complexity type
     * @param tsFileStats
     */
    // incrementMethodsByStatus(type: ComplexityType, tsFileStats: Stats): void {
    //     this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
    //     this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
    //     this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    // }


    /**
     * Returns the path of the TreeFolder linked to this service
     */
    // getNameOrPath(treeFolder: TreeFolder): void {
    //     this._stats.subject = getRelativePath(Options.pathCommand, treeFolder.path);
    // }


    /**
     * Returns the path between a TreeFolder's path and a TreeFile's path which is inside it or inside one of its subfolders
     * @param treeFolder      // The path of the TreeFolder
     * @param treeFile        // The path of the TreeFile
     */
    // getRouteFromFolderToFile(treeFolder: TreeFolder, treeFile: TreeFile): string {
    //     if (!treeFile || !treeFolder) {
    //         return undefined;
    //     }
    //     if (treeFile.treeFolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
    //         console.log(`The file ${treeFile.name} is not inside the folder ${treeFolder.path}`);
    //         return undefined;
    //     } else {
    //         const linkStarter = treeFolder.relativePath === '' ? './' : '.';
    //         return `${linkStarter}${treeFile.treeFolder.path.slice(treeFolder.path.length)}`;
    //     }
    // }


    /**
     * Returns the route from the folder of a TreeFolder to one of its subfolders
     * @param treeFolder
     * @param treeSubfolder
     */
    // getRouteFromFolderToSubFolder(treeFolder: TreeFolder, treeSubfolder: TreeFolder): string {
    //     if (!treeFolder || !treeSubfolder|| treeSubfolder.path === treeFolder.path ) {
    //         return undefined;
    //     }
    //     if (treeSubfolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
    //         console.log(`The folder ${treeSubfolder.path} is not a subfolder of ${treeFolder.path}`);
    //         return undefined;
    //     } else {
    //         const linkStarter = treeFolder.relativePath === '' ? './' : '.';
    //         return `${linkStarter}${treeSubfolder.path.slice(treeFolder.path.length)}`;
    //     }
    // }

}