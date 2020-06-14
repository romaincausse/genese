"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
const evaluable_model_1 = require("../../models/evaluable.model");
const ast_folder_service_1 = require("../services/ast-folder.service");
/**
 * Element of the TreeNode structure corresponding to a given folder
 */
class AstFolder extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.complexitiesByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus(); // The folder complexities spread by complexity status
        this.cpxIndex = 0; // The complexity index of this folder
        this.numberOfFiles = 0; // The number of files in this folder and its subfolders
        this.numberOfMethods = 0; // The number of methods included in all the files of this folder and its subfolders
        this.parent = undefined; // The AstFolder corresponding to the parent folder of this AstFolder
        this.path = ''; // The absolute path of this folder
        this.relativePath = ''; // The relative path of this folder
        this.stats = undefined; // The stats corresponding to this folder
        this.children = []; // The subfolders of this folder
        this.astFiles = []; // The array of files of this folder (not in the subfolders)
        this.astFolderService = new ast_folder_service_1.AstFolderService(); // The AstFolderService linked to this AstFolder
        this.astFolderService.treeFolder = this;
    }
    /**
     * Gets the stats of this TreeFile
     */
    getStats() {
        // if (!this.stats) {
        //     this.stats = this.astFolderService.getStats(this);
        // }
        return this.stats;
    }
    /**
     * Evaluates the complexities of the TreeFiles of this AstFolder
     */
    evaluate() {
        for (const file of this.astFiles) {
            // this.cpxIndex += file.cpxIndex;
            // this.cyclomaticCpx += file.cyclomaticCpx;
            // this.numberOfMethods += file.treeMethods?.length ?? 0;
            // this.numberOfFiles++;
            // this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
    }
}
exports.AstFolder = AstFolder;