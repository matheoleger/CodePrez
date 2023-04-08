import { nativeImage } from "electron";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import path from "path";
import fs from 'fs';

export function markdownHighlight(presentationPath: string) {

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
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];

        const src = token.attrGet("src");

        const regexForSrc = /\.\/assets/gm;

        const srcWithPresentationPath = (src?.match(regexForSrc)) ? path.join("codeprez:/", presentationPath, src) : src
        token.attrSet('src', srcWithPresentationPath || "")

        return self.renderToken(tokens, idx, options)
    }

    //Include code via files
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx];

        const href = token.attrGet("href");

        const regexPathFile = /^\.\/(.+\.\w+)/gm;
        const regexLineNumber = /#(\d+)-(\d+)/;
        const regexFileExtension = /\.(\w+)(?:#\d+-\d+)?$/;

        const pathFile = href?.match(regexPathFile) ?? [];

        const lineNumbers = href?.match(regexLineNumber) ?? [];
        const startNumber = lineNumbers[1];
        const endNumber = lineNumbers[2];

        const fileExtension = href?.match(regexFileExtension) ?? [];

        if(pathFile) {
            const file = fs.readFileSync(path.join(presentationPath, pathFile[0] ?? ""), { encoding: 'utf8' });    
            const lines = file.split("\n").slice(Number(startNumber)-1, Number(endNumber));
        
            // return (
            //     `<pre class="hljs"><code>${hljs.highlight(lines.join("\n"), {
            //                 language: fileExtension[1] || "",
            //                 ignoreIllegals: true,
            //             }).value}</code></pre>`
            // )

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

        return self.renderToken(tokens, idx, options);
    }

    return md;
}
