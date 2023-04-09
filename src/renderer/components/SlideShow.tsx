import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Slide } from '../../components/Slide';
import "../../assets/css/SlideViewer.css"

type Props = {
    config?: PresentationConfig,
    content: string[],
    style?: string,
    slideScale: "slideViewer" | "preview" | "sidebar"
}

export const SlideShow = (props: Props) => {
    const {config, content, style, slideScale} = props;

    return (
        <>
            <Slide slideScale={slideScale} className={slideScale == "slideViewer" ? "viewer-slide slide-0" : "slide-0"}>
              <h1>{config?.title}</h1>
              
              <div className="authors">
                <h3>Créé par : {config?.authors.join(", ")}</h3>
              </div>
            </Slide>
            {Array.isArray(content) && content.map((slide, index) => (
                <Slide key={index} slideScale={slideScale} className={slideScale == "slideViewer" ? `viewer-slide slide-${index+1}` : `slide-${index+1}`}>
                    {slide}
                </Slide>
            ))}
            <style>
                {style ?? ""}
            </style>
        </>
    );
};
