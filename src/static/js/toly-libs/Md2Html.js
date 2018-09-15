const fs = require('fs');
const path = require('path');
const marked = require('marked');
let hljs = require('highlight.js');

// md2Html("MarkDownTest.md", ["java", "cpp", "python"], "GooleCode.css");

class Md2Html {
    static md2Html(content, languageArray) {

        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            escaped: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return hljs.highlightAuto(code, languageArray).value;
            }
        });

        return marked(content);

    }
}

export default Md2Html;
