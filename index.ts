import { app, BrowserWindow } from "electron";
import { join } from "path";
import { createArchive } from "./src/main/createArchive";
import { openFileDialog, saveFileDialog } from "./src/main/dialogs";
import { Slide } from "./src/components/Slide";

import {
    deleteCodePrezTempFolder,
    openCodePrezArchive,
} from "./src/main/openAndCloseCodePrezFiles";
import { markdownHighlight } from "./src/renderer/utils/utils";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        backgroundColor: "#3A3939",
        webPreferences: {
            preload: join(__dirname, "src/preload/preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
        icon: "public/favicon.ico",
    });
    if (process.env.NODE_ENV === "production") {
        win.loadFile("../build/index.html");
    } else {
        win.loadURL("http://localhost:3000");
    }
    win.maximize();

    // Add File
    win.webContents.ipc.on("open-dialog", async (e, data) => {
        const file = await openFileDialog(data.type);
        win.webContents.send("set-file", file);
    });

    // Create .CodePrez with files
    win.webContents.ipc.on("create-codeprez", async (e, data) => {
        const file = (await saveFileDialog())!;
        await createArchive(data, file);
    });

    // Open presentation .codeprez
    win.webContents.ipc.on("open-presentation", async (e, data) => {
        const archivePath = await openFileDialog(data.type);

        if (!archivePath) return;

        const presentationData = await openCodePrezArchive(archivePath);
        const slides =
            presentationData?.presentationFileContent?.split(/^---$/gm);
        const createSection = slides?.map((slide, index) => {
            const dataMd: string = markdownHighlight().render(slide);
            return dataMd;
        });

        if (!presentationData) {
            return null;
        }
        presentationData.presentationFileContent = createSection || ([] as any);
        win.webContents.send("set-codeprez-data", presentationData);
    });

    win.once("ready-to-show", async () => {
        win.show();

        // const presentationData = await openCodePrezArchive("./src/main/example.codeprez");

        // win.webContents.send("set-codeprez-data", presentationData)
    });

    win.on("close", () => deleteCodePrezTempFolder());

    return win;
};

const initialize = async () => {
    await app.whenReady();
    const win = createWindow();
};

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
initialize();
