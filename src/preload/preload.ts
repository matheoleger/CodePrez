import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
    getPresentationData: (setPresentationData: Function) => void,
    sendExecuteCommand: (command: string) => void,
}

contextBridge.exposeInMainWorld("api",{
    getPresentationData: (setPresentationData: Function) => {
        ipcRenderer.once("set-codeprez-data", (event, data) => setPresentationData(data))
    },
    sendExecuteCommand: (command: string) => {
        ipcRenderer.send("execute-command", {command})
    }
});