import React, { useState } from "react";
import logo from "./assets/logo.svg";
import "./assets/css/App.css";
import "highlight.js/styles/github.css";
import { markdownHighlight } from "./renderer/utils/utils";

function App() {
    const markdown = `
  \`\`\`typescript
    const variable = 'hello';

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }
  \`\`\`
`;

    const [result, setResult] = useState("test");

    /* function onclick submit window.api... */

    const submit = () => {
        console.log("submit");
        window.api.readFileMarkdown(setResult);
        console.log(result);
    };

    /* window.api.readFileMarkdown(setResult); */

    /* var result3 = markdownHighlight().render(
        markdown +
            "# Hello World! \n ## This is a subtitle --- Oui ::: section ### This is a sub-subtitle"
    ); */

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <div dangerouslySetInnerHTML={{ __html: result }} />

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button onClick={submit}>test</button>
            </header>
        </div>
    );
}

export default App;
