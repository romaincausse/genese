"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAstToReports = void 0;
const init_service_1 = require("./services/init.service");
const reports_service_1 = require("./services/report/reports.service");
const chalk = require("chalk");
/**
 * Main process jsonAst analysis and reports
 */
class JsonAstToReports {
    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathFolderToAnalyze
     * @param pathGeneseNodeJs
     * @param jsonAstPath
     */
    static start(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs, jsonAstPath = '/json-ast.json') {
        console.log(chalk.blueBright('START REPORTS GENERATION FROM JSON_AST'));
        const jsonAst = new init_service_1.InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        reports_service_1.ReportsService.generateAllReports(jsonAst);
        console.log(chalk.greenBright('REPORTS GENERATED SUCCESSFULLY'));
        console.log('Please open the file "folder-report.html" located in "genese" folder in your browser');
    }
    /**
     * Returns the content of the JsonAst file
     * @param jsonAstPath
     */
    static getJsonAst(jsonAstPath) {
        const jsonAst = require(jsonAstPath);
        return jsonAst;
    }
}
exports.JsonAstToReports = JsonAstToReports;
