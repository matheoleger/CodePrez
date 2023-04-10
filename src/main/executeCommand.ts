import { spawn } from "child_process";

export const executeCommand = (command: string) => {
    // BrowserWindow.getFocusedWindow()

    // const test = spawn("npm", ["run", "dev"], { cwd: process.cwd(), shell: true })
    console.log(command);
}

// ipcMain.on("execute-command", (event: any, {command}:{command: string}) => executeCommand(command));