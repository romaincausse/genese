import { JsonAst } from '../models/json-ast.model';

export class PhpToJsonAstService {

    static convert(path: string): JsonAst {
        const jsonAst = new JsonAst();
        return jsonAst;
    }

}
