import { useEffect } from "react";
import "../assets/css/Slide.css"

type Props = {
  children: string;
  slideScale: "preview" | "sidebar" | "slideViewer"
}

export const Slide = ({ children, slideScale }: Props) => {

    return (
      <section
        className={`slide-container scale-${slideScale}`}
          dangerouslySetInnerHTML={{
              __html: children,
          }}
      >
      </section>
    );
};
