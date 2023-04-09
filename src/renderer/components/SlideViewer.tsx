import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Slide } from '../../components/Slide';
import "../../assets/css/SlideViewer.css"

export const SlideViewer = () => {
    const [presentationData, setPresentationData] = useState<PresentationData>();

    const {state} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // window.api.getPresentationData(setPresentationData);
        window.api.setAppToFullScreen();
        setPresentationData(state);

        document.getElementById('viewer-container')?.focus(); //To focus on the div when the component is mounted (to be scrollable with Space or Arrow)
    }, [state]);

    document.addEventListener("keydown",(e) => {
        if(e.key == "Escape") {
            closeViewer();
        }
    }, true)

    document.getElementById('viewer-container')?.addEventListener("keydown", (e) => {
        console.log("KEY DOOOOOOOWN")
    })

    const closeViewer = () => {
        window.api.setAppToMaximized();
        navigate("/prez", {state})
    }

    return (
        <div className="viewer-container" id="viewer-container" tabIndex={-1}>
            <Slide slideScale="slideViewer" className="viewer-slide">
              <h1>{presentationData?.presentationConfig.title}</h1>
              
              <div className="authors">
                <h3>Créé par :</h3>
                {presentationData?.presentationConfig.authors.map((author, index) => (
                        <h3 key={index}>{author}</h3>
                    ))}
              </div>
            </Slide>
            {Array.isArray(presentationData?.presentationFileContent) && presentationData?.presentationFileContent.map((slide, index) => (
                <Slide key={index} slideScale="slideViewer" className="viewer-slide">
                    {slide}
                </Slide>
            ))}
            <style>
                {presentationData?.presentationStyle}
            </style>
        </div>
    );
};
