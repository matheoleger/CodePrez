import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
    sendExecuteCommand: (command: string) => void;
};

contextBridge.exposeInMainWorld("api", {
    sendExecuteCommand: (command: string) => {
        ipcRenderer.send("execute-command", { command });
    },
});
