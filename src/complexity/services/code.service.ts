import { Code } from '../models/code.model';

export class CodeService {

    constructor() {
    }


    createCode(text: string): Code {
        const code: Code = new Code();
        code.text = text;
        const textLines: string[] = text.split('\n');
        let issue = 1;
        let pos = 0;
        for (const textLine of textLines) {
            code.lines.push({text: textLine, issue: issue, position: pos});
            code.maxLineWidth = code.maxLineWidth < textLine.length ? textLine.length : code.maxLineWidth;
            issue++;
            pos = textLine ? pos + textLine.length + 1 : pos;
        }
        return code;
    }


    getLineIssue(code: Code, position: number): number {
        if (position < 0 || position > code.text.length) {
            return 0;
        }
        let issue = 0;
        for (const line of code.lines) {
            if (position < line?.position + line?.text.length) {
                issue = line?.issue - 1;
                break;
            }
        }
        return issue;
    }
}