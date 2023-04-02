// const { BrowserWindow, ipcMain } = require("electron");
// const { spawn } = require("child_process");

import { BrowserWindow, ipcMain } from "electron";
import { spawn } from "child_process";

export const executeCommand = (command: string) => {
    // BrowserWindow.getFocusedWindow()
    console.log(command);
}

ipcMain.on("execute-command", (event: any, {command}:{command: string}) => executeCommand(command));

