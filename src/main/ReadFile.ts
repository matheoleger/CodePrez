import { readFile } from "fs/promises";
import hljs from "highlight.js";

var md = markdownHighlight();

export function markdownHighlight() {
    return require("markdown-it")({
        highlight: function (str: string, lang: string) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return (
                        '<pre class="hljs"><code>' +
                        hljs.highlight(str, {
                            language: lang,
                            ignoreIllegals: true,
                        }).value +
                        "</code></pre>"
                    );
                } catch (__) {}
            }

            return (
                '<pre class="hljs"><code>' +
                md.utils.escapeHtml(str) +
                "</code></pre>"
            );
        },
    });
}

export const readFileMd = async () => {
    /* read file in project directory */
    console.log("readFile");

    const file = await readFile("./presentation.md", "utf-8");
    console.log("file");
    return file;
};
