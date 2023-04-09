import { contextBridge, ipcRenderer } from "electron";

export interface CreationCodePrezProps {
    mdFilePath: string,
    cssFilePath: string,
    envDirectoryPath: string,
    assetsDirectoryPath: string,
    title: string,
    duration: string,
    authors: string[],
}

export type ContextBridgeApi = {
    getPresentationData: (setPresentationData: Function) => void,
    setAppToFullScreen: () => void,
    setAppToMaximized: () => void,
    sendExecuteCommand: (command: string) => void,
    openFileDialog: (type: "md" | "css" | "env" | "assets", callback: Function) => null;
    createCodePrez: ({ mdFilePath, cssFilePath, envDirectoryPath, assetsDirectoryPath, title, duration, authors }: CreationCodePrezProps) => null;
}

contextBridge.exposeInMainWorld("api", {
    getPresentationData: (setPresentationData: Function) => {
        ipcRenderer.send("open-presentation", { type: "codeprez" });
        ipcRenderer.once("set-codeprez-data", (event, data) => setPresentationData(data))
    },
    setAppToFullScreen: () => {
        ipcRenderer.send("fullscreen-app")
    },
    setAppToMaximized: () => {
        ipcRenderer.send("maximized-app")
    },
    sendExecuteCommand: (command: string) => {
        ipcRenderer.send("execute-command", { command })
    },
    openFileDialog: (type: "md" | "css" | "env" | "assets", callback: Function) => {
        ipcRenderer.send("open-dialog", { type });
        ipcRenderer.once("set-file", (e, data) => callback(data));
    },
    createCodePrez: ({ mdFilePath, cssFilePath, envDirectoryPath, assetsDirectoryPath, title, duration, authors }: CreationCodePrezProps) => {

        ipcRenderer.send("create-codeprez", { mdFilePath, cssFilePath, envDirectoryPath, assetsDirectoryPath, title, duration, authors })
    }
});