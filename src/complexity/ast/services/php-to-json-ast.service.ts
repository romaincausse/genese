import { JsonAst } from '../models/json-ast.model';

export class PhpToJsonAstService {

    static convert(path: string): JsonAst {
        const jsonAst = new JsonAst();
        jsonAst.astFile.path = path;
        return jsonAst;
    }

}