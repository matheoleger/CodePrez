import React from "react";
import '../../assets/css/ExecutableCommand.css';

import PlayIcon from "../../assets/svg/play_arrow_icon.svg"

type Props = {
    command: string,
}

export const ExecutableCommand = (props: Props) => {
    
    const { command } = props;

    const executeCommand = () => {
        window.api.sendExecuteCommand(command);
    }
    
    return (
        <div className="executable-command">
            <div className="command-and-button">
                <pre>{ command }</pre>
                <button onClick={executeCommand}>
                    <img src={PlayIcon} alt="playicon" width="30" />
                </button>
            </div>
            <pre></pre>
        </div>
    )
}