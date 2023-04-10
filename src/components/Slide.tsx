import { useEffect, useRef, useState } from "react";
import "../assets/css/Slide.css"

type Props = {
  children: string | React.ReactElement[];
  slideScale: "preview" | "sidebar" | "slideViewer",
  className?: string,
  setExecutedCommandOutput?: Function
}

export const Slide = ({ children, slideScale, className, setExecutedCommandOutput }: Props) => {

  const ref = useRef<HTMLElement>(null);

  const parser = new DOMParser();

  useEffect(() => {
    const currentSection: HTMLElement | null = ref.current

    const executableCommandsPre = currentSection?.getElementsByClassName("executable-command")

    Array.from(executableCommandsPre ?? []).forEach((executableCommand) => {
      console.log(executableCommand);

      const command = executableCommand.getElementsByClassName("command-to-execute").item(0)?.textContent;
      console.log(command);

      const button = executableCommand.getElementsByClassName("execute-command-btn").item(0)

      button?.addEventListener("click", () => {
        if(!command) return;

        if(setExecutedCommandOutput) {
          window.api.sendExecuteCommand(command, (data: string) => setExecutedCommandOutput(data))
        }
      })
    })
  },[])

  if(typeof children == "string") {
    return (
      <section
        className={`slide-container scale-${slideScale} ${className ?? ""}`}
          dangerouslySetInnerHTML={{
              __html: children,
          }}
        ref={ref}
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
