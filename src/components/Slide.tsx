import { useEffect } from "react";
import "../assets/css/Slide.css"

type Props = {
  children: string | React.ReactElement[];
  slideScale: "preview" | "sidebar" | "slideViewer",
  className?: string
}

export const Slide = ({ children, slideScale, className }: Props) => {

  if(typeof children == "string") {
    return (
      <section
        className={`slide-container scale-${slideScale} ${className ?? ""}`}
          dangerouslySetInnerHTML={{
              __html: children,
          }}
      >
      </section>
    );
  } else {
    return (
      <section className={`slide-container scale-${slideScale} ${className ?? ""}`}>
        {children}
      </section>
    )
  }

};
