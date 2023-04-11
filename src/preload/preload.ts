import { contextBridge, ipcRenderer } from "electron";

export interface CreationCodePrezProps {
    mdFilePath: string;
    cssFilePath: string;
    envDirectoryPath: string;
    assetsDirectoryPath: string;
    title: string;
    duration: string;
    authors: string[];
}

export type ContextBridgeApi = {
    getPresentationData: (setPresentationData: Function) => void;
    setAppToFullScreen: (data: PresentationData) => void;
    listenViewerMode: (callback: Function) => void;
    setAppToMaximized: () => void;
    killDualScreen: () => void;
    sendExecuteCommand: (command: string, callback: Function) => void;
    openFileDialog: (
        type: "md" | "css" | "env" | "assets",
        callback: Function
    ) => null;
    createCodePrez: ({
        mdFilePath,
        cssFilePath,
        envDirectoryPath,
        assetsDirectoryPath,
        title,
        duration,
        authors,
    }: CreationCodePrezProps) => null;
};

contextBridge.exposeInMainWorld("api", {
    getPresentationData: (setPresentationData: Function) => {
        ipcRenderer.send("open-presentation", { type: "codeprez" });
        ipcRenderer.once("set-codeprez-data", (event, data) =>
            setPresentationData(data)
        );
    },
    setAppToFullScreen: (data: PresentationData) => {
        ipcRenderer.send("fullscreen-app", { data });
    },
    setAppToMaximized: () => {
        ipcRenderer.send("maximized-app");
    },
    sendExecuteCommand: (command: string, callback: Function) => {
        ipcRenderer.send("execute-command", command);
        ipcRenderer.once("executed-command-output", (e, data) =>
            callback(data)
        );
    },
    openFileDialog: (
        type: "md" | "css" | "env" | "assets",
        callback: Function
    ) => {
        ipcRenderer.send("open-dialog", { type });
        ipcRenderer.once("set-file", (e, data) => callback(data));
    },
    createCodePrez: ({
        mdFilePath,
        cssFilePath,
        envDirectoryPath,
        assetsDirectoryPath,
        title,
        duration,
        authors,
    }: CreationCodePrezProps) => {
        ipcRenderer.send("create-codeprez", {
            mdFilePath,
            cssFilePath,
            envDirectoryPath,
            assetsDirectoryPath,
            title,
            duration,
            authors,
        });
    },
    listenViewerMode: (callback: Function) => {
        ipcRenderer.on("viewer-mode", (e, data) => callback(data));
    },
    killDualScreen: () => {
        ipcRenderer.send("kill-dual-screen");
    },
});
