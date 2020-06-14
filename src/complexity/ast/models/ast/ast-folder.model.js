"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _complexitiesByStatus, _cpxFactors, _cyclomaticCpx, _parent, _path, _stats;
Object.defineProperty(exports, "__esModule", { value: true });
const complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
class AstFolder {
    // initService?: InitService = new InitService();            // The InitService linked to this AstFolder
    constructor() {
        _complexitiesByStatus.set(this, new complexities_by_status_interface_1.ComplexitiesByStatus()); // The folder complexities spread by complexity status
        _cpxFactors.set(this, undefined);
        // cpxIndex ?= 0;                                                              // The complexity index of this folder
        _cyclomaticCpx.set(this, 0);
        // numberOfFiles ?= 0;                                                         // The number of files in this folder and its subfolders
        // numberOfMethods ?= 0;                                                       // The number of methods included in all the files of this folder and its subfolders
        _parent.set(this, undefined); // The AstFolder corresponding to the parent folder of this AstFolder
        _path.set(this, undefined); // The absolute path of this folder
        // relativePath ?= '';                                                         // The relative path of this folder
        _stats.set(this, undefined); // The stats corresponding to this folder
        this.children = []; // The subfolders of this folder
        this.astFiles = []; // The array of files of this folder (not in the subfolders)
        // this.initService.treeFolder = this;
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get complexitiesByStatus() {
        return __classPrivateFieldGet(this, _complexitiesByStatus);
    }
    set complexitiesByStatus(complexitiesByStatus) {
        __classPrivateFieldSet(this, _complexitiesByStatus, complexitiesByStatus);
    }
    get cpxFactors() {
        if (__classPrivateFieldGet(this, _cpxFactors)) {
            return __classPrivateFieldGet(this, _cpxFactors);
        }
        this.evaluate();
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    get cyclomaticCpx() {
        return __classPrivateFieldGet(this, _cyclomaticCpx);
    }
    set cyclomaticCpx(cyclomaticCpx) {
        __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
    }
    get parent() {
        return __classPrivateFieldGet(this, _parent);
    }
    set parent(parent) {
        __classPrivateFieldSet(this, _parent, parent);
    }
    get path() {
        return __classPrivateFieldGet(this, _path);
    }
    set path(path) {
        __classPrivateFieldSet(this, _path, path);
    }
    // TODO : implement
    get relativePath() {
        return __classPrivateFieldGet(this, _path);
    }
    get stats() {
        return __classPrivateFieldGet(this, _stats);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of the TreeFiles of this AstFolder
     */
    evaluate() {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        for (const astFile of this.astFiles) {
            // TODO : evaluate AstFile
            // astFile.evaluate();
            this.cpxFactors = this.cpxFactors.add(astFile.cpxFactors);
            console.log('EVAL AST FILE');
            this.cyclomaticCpx = this.cyclomaticCpx + astFile.cyclomaticCpx;
            // this.numberOfMethods += file.treeMethods?.length ?? 0;
            // this.numberOfFiles++;
            this.complexitiesByStatus = this.complexitiesByStatus.add(astFile.complexitiesByStatus);
        }
    }
}
exports.AstFolder = AstFolder;
_complexitiesByStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _parent = new WeakMap(), _path = new WeakMap(), _stats = new WeakMap();
