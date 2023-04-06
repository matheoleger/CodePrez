import { useState, useEffect } from "react";
import { Slide } from "./Slide";
//TODO: Search for a way to import the css file from the presentation folder and display images with the folder temp

export const Presentation = () => {
    const [presentationData, setPresentationData] =
        useState<PresentationData>();

    useEffect(() => {
        console.log("Je vais dans le useEffect combien de fois ?");
        window.api.getPresentationData(setPresentationData);
    }, []);

    /* const updateCSS = () => {
        if (presentationData?.presentationPath) {
            const head = document.head;
            const link = document.createElement("link");

            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = presentationData?.presentationPath + "/style.css";
            head.appendChild(link);
            import(presentationData?.presentationPath + "/style.css");
        }
    };
    updateCSS(); */

    return (
        <div>
            {/* <link
                rel="stylesheet"
                type="text/css"
                href={presentationData?.presentationPath + "/style.css"}
            ></link> */}
            <h1>{presentationData?.presentationConfig.title}</h1>
            {Array.isArray(presentationData?.presentationFileContent) &&
                presentationData?.presentationFileContent.map(
                    (slide, index) => <Slide key={index}>{slide}</Slide>
                )}
        </div>
    );
};
