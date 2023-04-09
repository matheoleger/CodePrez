import { useState, useEffect } from "react";
import "../assets/css/Presentation.css"
import { Slide } from "./Slide";
import { useLocation } from "react-router-dom";
import { NavigationButton } from './NavigationButton';
//TODO: Search for a way to import the css file from the presentation folder and display images with the folder temp

export const Presentation = () => {
    const [presentationData, setPresentationData] = useState<PresentationData>();

    const {state} = useLocation()

    useEffect(() => {
        // window.api.getPresentationData(setPresentationData);
        setPresentationData(state);
    }, [state]);

    return (
        <div className="presentation-page">
            {/* <link
                rel="stylesheet"
                type="text/css"
                href={"codeprez:\\" + presentationData?.presentationPath + "\\style.css"}
            ></link> */}
            <div className="presentation-header">
                <h1 className="presentation-title">{presentationData?.presentationConfig.title}</h1>
                <NavigationButton goTo="viewer" withIcon/>
            </div>
            <Slide slideScale="preview">
              <h1>{presentationData?.presentationConfig.title}</h1>
              
              <div className="authors">
                <h3>Créé par :</h3>
                {presentationData?.presentationConfig.authors.map((author, index) => (
                        <h3 key={index}>{author}</h3>
                    ))}
              </div>
            </Slide>
            {Array.isArray(presentationData?.presentationFileContent) &&
                presentationData?.presentationFileContent.map((slide, index) => (
                    <Slide key={index} slideScale="preview">
                        {slide}
                    </Slide>
                ))}
            <style>
                {presentationData?.presentationStyle}
            </style>
        </div>
    );
};
