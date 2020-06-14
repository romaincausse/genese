import { ComplexityType } from '../../../enums/complexity-type.enum';
import { AstFile } from '../../models/ast/ast-file.model';
import { AstNode } from '../../models/ast/ast-node.model';
import { AstMethodService } from './ast-method.service';
import { AstNodeService } from './ast-node.service';
import { AstMethod } from '../../models/ast/ast-method.model';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';

/**
 * - AstFiles generation from Abstract Syntax AstNode of a file
 * - Other services for AstFiles
 */
export class AstFileService extends StatsService {

    protected _stats: Stats = undefined;                                // The statistics of the AstFile
    astFile: AstFile = undefined;                                       // The AstFile corresponding to this service
    astMethodService?: AstMethodService = new AstMethodService();    // The service managing AstMethods
    astNodeService?: AstNodeService = new AstNodeService();          // The service managing AstNodes


    constructor() {
        super();
    }


    /**
     * Returns an array of AstNodes with all the AstNode children of the first param concatenated with the second param
     * @param astNode      // The "parent" node to parse
     * @param astNodes     // The "accumulator"
     */
    private flatMapAstNodes(astNode: AstNode, astNodes: AstNode[]): AstNode[] {
        for (const childAstNode of astNode?.children) {
            astNodes.push(childAstNode);
            if (childAstNode.children.length > 0) {
                    astNodes = astNodes.concat(this.flatMapAstNodes(childAstNode, []));
            }
        }
        return astNodes;
    }


    /**
     * Sets the astMethod property to a given astNode
     * @param astNode      // The AstNode to update
     */
    private setNodeMethod(astNode: AstNode): AstNode {
        return astNode.isFunctionOrMethodDeclaration ? this.astMethodService.setNodeMethod(astNode) : undefined;
    }


    /**
     * Returns the array of the AstMethods corresponding to an array of AstNodes
     * @param astNodes     // The array of AstNodes
     */
    private setAstMethods(astNodes: AstNode[]): AstMethod[] {
        const astMethods: AstMethod[] = [];
        for (const astNode of astNodes) {
            if (astNode.astMethod) {
                astMethods.push(astNode.astMethod);
            }
        }
        return astMethods;
    }


    /**
     * Sets the javascript context of each AST node
     * @param astNode      // The "parent" Node
     */
    private setContextToAstNodeChildren(astNode: AstNode): void {
        for (const childAstNode of astNode?.children) {
            childAstNode.context = this.astNodeService.getContext(childAstNode);
            this.setContextToAstNodeChildren(childAstNode);
        }
    }


    /**
     * Calculates the statistics of the AstFile
     * @param astFile    // The AstFile to analyse
     */
    calculateStats(astFile: AstFile): void {
        this._stats.numberOfMethods = astFile.astMethods?.length ?? 0;
        for (const method of astFile.astMethods) {
            this.incrementStats(method);
        }
    }


    /**
     * Increments AstFile statistics for a given method
     * @param astMethod    // The AstMethod to analyse
     */
    incrementStats(astMethod: AstMethod): void {
        this.incrementStatsMethodsByStatus(astMethod, ComplexityType.COGNITIVE);
        this.incrementStatsMethodsByStatus(astMethod, ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(astMethod.cpxIndex);
        this._stats.barChartCyclomatic.addResult(astMethod.cyclomaticCpx);
    }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param astMethod        // The AstMethod to analyse
     * @param type              // The complexity type
     */
    incrementStatsMethodsByStatus(astMethod: AstMethod, type: ComplexityType): void {
        const status = (type === ComplexityType.COGNITIVE) ? astMethod.cognitiveStatus : astMethod.cyclomaticStatus;
        switch (status) {
            case MethodStatus.CORRECT:
                this._stats.numberOfMethodsByStatus[type].correct ++;
                break;
            case MethodStatus.ERROR:
                this._stats.numberOfMethodsByStatus[type].error ++;
                break;
            case MethodStatus.WARNING:
                this._stats.numberOfMethodsByStatus[type].warning ++;
                break;
            default:
                break;
        }
    }


    /**
     * Adds the filename to the stats
     */
    getNameOrPath(): void {
        this._stats.subject = this.astFile.name;
    }

}