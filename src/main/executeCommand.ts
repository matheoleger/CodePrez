import { spawn } from "child_process";
import path from "path";
import { BrowserWindow, app } from 'electron';

export const executeCommand = (executableCommand: string) => {
    const tempPath = app.getPath("temp");

    const presentatioEnvPath = path.join(tempPath, "codeprez/env")

    const splittedCommand = executableCommand.split(" ")

    const command = splittedCommand[0]
    const args = splittedCommand.slice(1);

    const spawnCommand = spawn(command, args, { cwd: presentatioEnvPath, shell: true })

    let output = "";

    spawnCommand.stdout.on('data', (chunk) => {
        output += chunk.toString();
    })

    spawnCommand.stderr.on('data', (chunk) => {
        output += chunk.toString();
    })

    spawnCommand.on('exit', (code) => {
        BrowserWindow.getFocusedWindow()?.webContents.send("executed-command-output", output)
    });
}