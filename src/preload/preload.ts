import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
    sendExecuteCommand: (command: string) => void;
    readFileMarkdown: (callback: Function) => string | void;
};

contextBridge.exposeInMainWorld("api", {
    sendExecuteCommand: (command: string) => {
        ipcRenderer.send("execute-command", { command });
    },
    readFileMarkdown: (callback: Function) => {
        ipcRenderer.once("read-file-markdown", (event, data) => {
            console.log("render ipc... ", data);
            callback(data);
        });
    },
});
