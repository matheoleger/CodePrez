import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Slide } from '../../components/Slide';
import "../../assets/css/SlideViewer.css"
import { SlideShow } from './SlideShow';

export const SlideViewer = () => {
    const [presentationData, setPresentationData] = useState<PresentationData>();

    const [executedCommandOutput, setExecutedCommandOutput] = useState<string>();

    const {state} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        window.api.setAppToFullScreen();
        setPresentationData(state);

        document.addEventListener("keydown", escapeListener)
        document.getElementById('viewer-container')?.focus(); //To focus on the div when the component is mounted (to be scrollable with Space or Arrow)
    }, [state]);

    const escapeListener = (e: any) => {
        if(e.key == "Escape") {
            closeViewer();

            //Remove listener to prevent multiple listener (we don't use {once: true} because of condition Escape)
            document.removeEventListener("keydown", escapeListener); 
        }
    }

    const closeViewer = () => {
        window.api.setAppToMaximized();
        navigate("/prez", {state})
    }

    return (
        <div className="viewer-container" id="viewer-container" tabIndex={-1}>
            <SlideShow 
                config={presentationData?.presentationConfig} 
                content={
                    (presentationData?.presentationFileContent.length 
                        && typeof presentationData?.presentationFileContent !== "string") 
                        ? presentationData?.presentationFileContent 
                        : []
                    }
                style={presentationData?.presentationStyle}
                slideScale="slideViewer"
                setExecutedCommandOutput={setExecutedCommandOutput}
            />
            <pre>
                {executedCommandOutput}
            </pre>
        </div>
    );
};
