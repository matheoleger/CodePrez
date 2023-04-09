import { useEffect } from "react";
import "../assets/css/Slide.css"

type Props = {
  children: string | React.ReactElement[];
  slideScale: "preview" | "sidebar" | "slideViewer"
}

export const Slide = ({ children, slideScale }: Props) => {

  if(typeof children == "string") {
    return (
      <section
        className={`slide-container scale-${slideScale}`}
          dangerouslySetInnerHTML={{
              __html: children,
          }}
      >
      </section>
    );
  } else {
    return (
      <section className={`slide-container scale-${slideScale}`}>
        {children}
      </section>
    )
  }

};
