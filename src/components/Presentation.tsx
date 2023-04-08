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
    }, [useLocation()]);

    return (
        <div className="presentation-page">
            {/* <link
                rel="stylesheet"
                type="text/css"
                href={"codeprez:\\" + presentationData?.presentationPath + "\\style.css"}
            ></link> */}
            <div>
                <h1 className="presentation-title">{presentationData?.presentationConfig.title}</h1>
                <NavigationButton goTo="viewer" withIcon/>
            </div>
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
