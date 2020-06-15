import * as ts from 'typescript';
import { AstNode } from '../../models/ast/ast-node.model';
import { AstService } from './ast.service';
import { AstMethod } from '../../models/ast/ast-method.model';

/**
 * Service managing AstNodes
 */
export class AstNodeService {


    // getCode()

    /**
     * Gets the javascript context of the AST node of a AstNode
     * @param astNode      // The AstNode for which we search the context
     */
    getContext(astNode: AstNode): AstNode {
        if (!astNode) {
            return undefined;
        }
        switch (astNode.kind) {
            case ts.SyntaxKind.SourceFile:
                return astNode;
            case ts.SyntaxKind.Identifier:
                return this.getIdentifierContext(astNode);
            case ts.SyntaxKind.ThisKeyword:
                return astNode.parent?.context?.context;
            default:
                if (astNode.parent?.mayDefineContext) {
                    return astNode.parent;
                } else {
                    return astNode.parent?.context;
                }
        }
    }


    /**
     * Gets the javascript context of an Identifier AST node of a given AstNode
     * @param astNode      // The concerned AstNode
     */
    private getIdentifierContext(astNode: AstNode): AstNode {
        if (this.isSecondSonOfPropertyAccessExpression(astNode)) {
            return astNode.parent?.firstSon?.mayDefineContext ? astNode.parent?.firstSon : astNode.parent?.firstSon.context;
        } else {
            return astNode.parent?.context;
        }
    }


    /**
     * Checks if a AstNode is the second son of an AST node "PropertyAccessExpression"
     * (the first son is the object and the second is its property)
     * @param astNode
     */
    private isSecondSonOfPropertyAccessExpression(astNode: AstNode): boolean {
        return AstService.isPropertyAccessExpression(astNode?.parent) && astNode === astNode?.parent.secondSon;
    }


    /**
     * Checks if a AstNode is a Callback (ie a parameter which is used later in a CallExpression)
     * @param astNode      // The AstNode to check
     */
    isCallback(astNode: AstNode): boolean {
        if (!astNode.isParam) {
            return false;
        }
        return  this.hasCallBack(astNode, astNode.parent);
    }


    /**
     * Checks if a Parameter AstNode is used in a CallExpression of its method
     * @param astNodeParam     // The Parameter AstNode
     * @param astNode          // Parameter used for recursion
     */
    private hasCallBack(astNodeParam: AstNode, astNode?: AstNode): boolean {
        for (const childAstNode of astNode?.children) {
            if (childAstNode.name === astNodeParam.name && childAstNode.context === astNodeParam.context && childAstNode.isCallIdentifier) {
                return true;
            }
            if (this.hasCallBack(astNodeParam, childAstNode)) {
                return true;
            }
        }
        return false;
    }


    /**
     * Checks if a AstNode is a recursive method (ie a MethodDeclaration or a FunctionDeclaration which is called from inside)
     * @param astNode      // The AstNode to check
     */
    isRecursiveMethod(astNode: AstNode): boolean {
        if (!astNode.isFunctionOrMethodDeclaration) {
            return false;
        }
        return this.hasRecursiveNode(astNode.astMethod, astNode);
    }


    /**
     * Checks if a MethodDeclaration or a FunctionDeclaration AstNode is called by one of its children
     * @param astNodeMethod     // The MethodDeclaration or FunctionDeclaration AstNode
     * @param astNode          // Parameter used for recursion
     */
    private hasRecursiveNode(astNodeMethod: AstMethod, astNode?: AstNode): boolean {
        for (const childAstNode of astNode?.children) {
            if (childAstNode.name === astNodeMethod.name && childAstNode.context === astNodeMethod.astNode.context && !astNode.isFunctionOrMethodDeclaration) {
                return true;
            }
            if (this.hasRecursiveNode(astNodeMethod, childAstNode)) {
                return true;
            }
        }
        return false;
    }
}
