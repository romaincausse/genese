import { TreeFolder } from '../../models/tree/tree-folder.model';
import { Stats } from '../../models/stats.model';
import { Language } from '../../ast/enums/language.enum';
import { AstFileService } from '../../ast/services/ast-file.service';
import { StatsService } from '../../services/report/stats.service';
import { JsonAst } from '../models/json-ast.model';
import { AstFolder } from '../models/ast-folder.model';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class AstFolderService {
// export class AstFolderService extends StatsService {

    protected _stats: Stats = undefined;                        // The statistics of the AstFolder
    astFileAstService?: AstFileService = new AstFileService();  // The service managing TreeFiles
    astFileService?: AstFileService = new AstFileService();  // The service managing TreeFiles
    treeFolder: TreeFolder = undefined;                         // The AstFolder corresponding to this service

    constructor() {
        // super();
    }


    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param jsonAst
     */
    generateAstFolders(jsonAst: JsonAst): JsonAst {
        jsonAst.astFolders = [];
        const paths = new Set(jsonAst.astFiles.map(e => e.path))
        paths.forEach(path => {
            jsonAst.astFolders.push(this.generateAstFolder(path));
        });
        console.log('JSON AST Astfolders', jsonAst)
        // const treeFolder: AstFolder = new AstFolder();
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


    generateAstFolder(path: string): AstFolder {
        const astFolder = new AstFolder();
        astFolder.path = path;
        return astFolder;
    }


    /**
     * Generates the AstFolder of a treeSubFolder which is a child of a given treeFolder with the path 'pathElement'
     * @param pathElement       // The path of the element
     * @param language          // The language of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The AstFolder of a subfolder of the param treeFolder
     * @param treeFolder        // The parent AstFolder
     */
    // private generateFileOrDirTree(pathElement: string, language: Language, treeSubFolder: AstFolder, treeFolder: AstFolder): void {
    //     if (fs.statSync(pathElement).isDirectory()) {
    //         let subFolder = new AstFolder();
    //         subFolder = this.generateAstFolders(`${pathElement}/`, language, subFolder);
    //         subFolder.parent = treeSubFolder;
    //         subFolder.path = pathElement;
    //         treeFolder.children.push(subFolder);
    //     } else if (!language || getLanguageExtensions(language).includes(getFileExtension(pathElement))) {
    //         if (!DEBUG || (DEBUG && pathElement === './src/complexity/mocks/debug.mock.ts')) {
    //             language = Language.PHP;
                // if (language === Language.TS) {
                //     treeFolder.astFiles.push(this.astFileAstService.generateTsTree(pathElement, treeFolder));
                // } else {
                //     const jsonAst: JsonAst = LanguageToJsonAstService.convert(pathElement, language);
                //     treeFolder.astFiles.push(this.astFileAstService.generateAstTree(jsonAst, treeFolder));
                // }
            // }
        // }
    // }


    /**
     * Calculates the statistics of the AstFolder
     * @param treeFolder        // The AstFolder to analyse
     */
    // calculateStats(treeFolder: AstFolder): void {
    //     this._stats.numberOfFiles += treeFolder?.astFiles?.length ?? 0;
    //     for (const file of treeFolder.astFiles) {
    //         this.incrementFileStats(file);
    //     }
    //     for (const subFolder of treeFolder.children) {
    //         this.calculateStats(subFolder);
    //     }
    // }


    /**
     * Increments AstFolder statistics for a given treeFile
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
     * Returns the path of the AstFolder linked to this service
     */
    // getNameOrPath(treeFolder: AstFolder): void {
    //     this._stats.subject = getRelativePath(Options.pathCommand, treeFolder.path);
    // }


    /**
     * Returns the path between a AstFolder's path and a TreeFile's path which is inside it or inside one of its subfolders
     * @param treeFolder      // The path of the AstFolder
     * @param treeFile        // The path of the TreeFile
     */
    // getRouteFromFolderToFile(treeFolder: AstFolder, treeFile: TreeFile): string {
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
     * Returns the route from the folder of a AstFolder to one of its subfolders
     * @param treeFolder
     * @param treeSubfolder
     */
    // getRouteFromFolderToSubFolder(treeFolder: AstFolder, treeSubfolder: AstFolder): string {
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
