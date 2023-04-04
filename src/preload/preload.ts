import { contextBridge, ipcRenderer } from "electron";

export interface CreationCodePrezProps {
    mdFilePath: string,
    cssFilePath: string,
    envDirectoryPath: string,
    assetsDirectoryPath: string,
    title: string,
    duration: string,
    participants: string,
}

export type ContextBridgeApi = {
    sendExecuteCommand: (command: string) => void,
    openFileDialog: (type: "md" | "css" | "env" | "assets", callback: Function) => null;
    createCodePrez: ({ mdFilePath, cssFilePath, envDirectoryPath, assetsDirectoryPath, title, duration, participants }: CreationCodePrezProps) => null;
}

contextBridge.exposeInMainWorld("api", {
    sendExecuteCommand: (command: string) => {
        ipcRenderer.send("execute-command", { command })
    },
    openFileDialog: (type: "md" | "css" | "env" | "assets", callback: Function) => {
        ipcRenderer.send("open-dialog", { type });
        ipcRenderer.once("set-file", (e, data) => callback(data));
    },
    createCodePrez: ({ mdFilePath, cssFilePath, envDirectoryPath, assetsDirectoryPath, title, duration, participants }: CreationCodePrezProps) => {

        ipcRenderer.send("create-codeprez", { mdFilePath, cssFilePath, envDirectoryPath, assetsDirectoryPath, title, duration, participants })
    }
});