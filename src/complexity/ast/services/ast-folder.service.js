"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_file_service_1 = require("../../ast/services/ast-file.service");
const json_ast_model_1 = require("../models/json-ast.model");
const ast_folder_model_1 = require("../models/ast-folder.model");
const ast_file_model_1 = require("../models/ast-file.model");
/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
class AstFolderService {
    constructor() {
        // export class AstFolderService extends StatsService {
        this._stats = undefined; // The statistics of the AstFolder
        this.astFileAstService = new ast_file_service_1.AstFileService(); // The service managing TreeFiles
        this.astFileService = new ast_file_service_1.AstFileService(); // The service managing TreeFiles
        this.treeFolder = undefined; // The AstFolder corresponding to this service
        // super();
    }
    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param jsonAst
     */
    generateAstFolders(jsonAst) {
        var _a;
        const newJsonAst = new json_ast_model_1.JsonAst();
        const astFolder = new ast_folder_model_1.AstFolder();
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder);
        astFolder.path = jsonAst.astFolder.path;
        for (const child of (_a = jsonAst.astFolder) === null || _a === void 0 ? void 0 : _a.children) {
            const newChild = this.generateAstFolder(child);
            newChild.parent = jsonAst.astFolder;
            astFolder.children.push(newChild);
        }
        console.log('AST FILESS', astFolder.astFiles);
        astFolder.evaluate();
        newJsonAst.astFolder = astFolder;
        // newJsonAst.log();
        return newJsonAst;
    }
    generateAstFolder(astFolder) {
        const newAstFolder = new ast_folder_model_1.AstFolder();
        newAstFolder.path = astFolder.path;
        newAstFolder.parent = astFolder.parent;
        newAstFolder.astFiles = this.generateAstFiles(astFolder);
        for (const childFolder of astFolder.children) {
            newAstFolder.children.push(this.generateAstFolder(childFolder));
        }
        return newAstFolder;
    }
    generateAstFiles(astFolder) {
        const astFiles = [];
        for (const astFile of astFolder.astFiles) {
            astFiles.push(this.generateAstFile(astFile));
        }
        return astFiles;
    }
    generateAstFile(astFile) {
        const newAstFile = new ast_file_model_1.AstFile();
        newAstFile.end = astFile.end;
        newAstFile.name = astFile.name;
        newAstFile.text = astFile.text;
        newAstFile.children = this.generateAstNodes(astFile.children);
        newAstFile.log();
        return newAstFile;
    }
    generateAstNodes(astNodes) {
        if (!Array.isArray(astNodes)) {
            return [];
        }
        const newAstNodes = [];
        for (const astNode of astNodes) {
            newAstNodes.push(this.generateAstNode(astNode));
        }
        return newAstNodes;
    }
    generateAstNode(astNode) {
        const newAstNode = astNode;
        newAstNode.end = astNode.end;
        newAstNode.kind = astNode.kind; // TODO : check if kind is correct
        newAstNode.pos = astNode.pos;
        newAstNode.children = this.generateAstNodes(astNode.children);
        return newAstNode;
    }
}
exports.AstFolderService = AstFolderService;
