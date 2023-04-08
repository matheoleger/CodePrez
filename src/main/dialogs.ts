import { BrowserWindow, dialog } from "electron";
import { homedir } from "os";

export const saveFileDialog = async () => {
    const saveFileDialogResult = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow()!, {
        title: "Sauvegarder...",
        defaultPath: homedir(),
        buttonLabel: "Save",
        filters: [
            {
                name: "Codeprez",
                extensions: ["codeprez"],
            }
        ]
    })
    if (!saveFileDialogResult.canceled) {
        return saveFileDialogResult.filePath!;
    }
}

export const openFileDialog = async (type: "md" | "assets" | "env" | "css" | "codeprez") => {
    let filterToApply: { name: string, extensions: string[] } | null;
    switch (type) {
        case "md":
            filterToApply = { name: "Fichier Markdown", extensions: ['md'] }
            break;
        case "css":
            filterToApply = { name: "Fichier CSS", extensions: ['css'] }
            break;
        case "codeprez":
            filterToApply = { name: "Archive CodePrez", extensions: ['codeprez'] }
            break;
        default:
            filterToApply = null;
            break;
    }

    const openDialogResult = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, {
        title: "Choisir un fichier",
        message: "Choisir un fichier : ." + type,
        buttonLabel: "Ouvrir",
        properties: [
            (type === "assets" || type === "env") ? "openDirectory" : "openFile"
        ],
        filters: [
            filterToApply!
        ]
    })
    if (!openDialogResult.canceled) {
        return openDialogResult.filePaths[0];
    }
}