import { nativeImage } from "electron";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import path from "path";
import fs from 'fs';
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";

type RendererRulesArguments = {
    tokens: Token[], 
    idx: number, 
    options: MarkdownIt.Options, 
    env: any, 
    self: Renderer, 
    presentationPath: string
}

type CodeFileRendererRulesArguments = {
    codeFilePath: string,
    href: string | null
}

export function markdownRenderer(presentationPath: string) {

    const markdownOptions: MarkdownIt.Options = {
        highlight: function (str: string, lang: string) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    if(lang == "bash") {
                        return (
                            '<pre class="hljs"><code>' +
                            hljs.highlight(str, {
                                language: lang,
                                ignoreIllegals: true,
                            }).value
                            + '</code><button class="execute-command-btn"><span class="material-symbols-outlined">play_arrow</span></button></pre>'
                        )
                    } else {
                        return (
                            '<pre class="hljs"><code>' +
                            hljs.highlight(str, {
                                language: lang,
                                ignoreIllegals: true,
                            }).value +
                            "</code></pre>"
                        );
                    }
                } catch (__) {}
            }

            return (
                '<pre class="hljs"><code>' +
                md.utils.escapeHtml(str) +
                "</code></pre>"
            );
        },
    }

    const md = MarkdownIt(markdownOptions);

    //Include images
    md.renderer.rules.image = (tokens, idx, options, env, self) => imageRendererRules({tokens, idx, options, env, self, presentationPath});

    //Include code via file
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => linkRendererRules({tokens, idx, options, env, self, presentationPath})

    return md;
}

const imageRendererRules = ({tokens, idx, options, env, self, presentationPath}: RendererRulesArguments) => {
    const token = tokens[idx];

    const src = token.attrGet("src");

    const regexForSrc = /\.\/assets/gm;

    const srcWithPresentationPath = (src?.match(regexForSrc)) ? path.join("codeprez:/", presentationPath, src) : src
    console.log(srcWithPresentationPath);
    token.attrSet('src', srcWithPresentationPath || "")

    return self.renderToken(tokens, idx, options)
}

const linkRendererRules = ({tokens, idx, options, env, self, presentationPath}: RendererRulesArguments) => {
    const token = tokens[idx];

    const href = token.attrGet("href")
    const regexPathFile = /^\.\/(.+\.\w+)/gm;
    const relativeCodeFilePath = href?.match(regexPathFile) ?? [];

    if(relativeCodeFilePath.length) {
        const codeFilePath = path.join(presentationPath, relativeCodeFilePath[0] ?? "")
        return codeFileRendererRules({codeFilePath: codeFilePath, href});
    } else {
        return self.renderToken(tokens, idx, options);
    }

}

const codeFileRendererRules = ({codeFilePath, href}: CodeFileRendererRulesArguments) => {

    const regexLineNumber = /#(\d+)-(\d+)/;
    const regexFileExtension = /\.(\w+)(?:#\d+-\d+)?$/;

    const lineNumbers = href?.match(regexLineNumber) ?? [];
    const startNumber = lineNumbers[1];
    const endNumber = lineNumbers[2];

    const fileExtension = href?.match(regexFileExtension) ?? [];

    const file = fs.readFileSync(codeFilePath, { encoding: 'utf8' });    
    const lines = file.split("\n").slice(Number(startNumber)-1, Number(endNumber));

    // I must use a concatenate string instead of `` because of tabulation and break line
    return (
        "<pre class='hljs'><code>" +
            hljs.highlight(lines.join("\n"), {
                    language: fileExtension[1] || "",
                    ignoreIllegals: true,
                }).value +
        "</code></pre>"
    )   
}
