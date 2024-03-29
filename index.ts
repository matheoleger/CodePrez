import { app, BrowserWindow, Menu, protocol, screen } from "electron";
import { join } from "path";
import { createArchive } from "./src/main/createArchive";
import { openFileDialog, saveFileDialog } from "./src/main/dialogs";
import url from "url";
import {
    deleteCodePrezTempFolder,
    openCodePrezArchive,
} from "./src/main/openAndCloseCodePrezFiles";
import { markdownRenderer } from "./src/main/markdownRenderer";
import { executeCommand } from "./src/main/executeCommand";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        title: "CodePrez",
        backgroundColor: "#3A3939",
        webPreferences: {
            preload: join(__dirname, "src/preload/preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
        icon: "public/favicon.ico",
    });
    if (app.isPackaged) {
        win.loadFile("./build/index.html");
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
        const createSection = separateAndRender(presentationData);

        if (!presentationData) return;

        presentationData.presentationFileContent = createSection || ([] as any);
        win.webContents.send("set-codeprez-data", presentationData);
    });

    let dual: BrowserWindow | null = null;
    //Set to maximize
    win.webContents.ipc.on("maximized-app", () => {
        win.setFullScreen(false);
        if (dual) {
            dual?.close();
        }
    });

    //Set to fullscreen
    win.webContents.ipc.on("fullscreen-app", (e, data) => {
        let display = screen.getAllDisplays();
        let externalDisplay = display.find((display) => {
            return display.bounds.x !== 0 || display.bounds.y !== 0;
        });

        if (externalDisplay) {
            dual = createDualSplitWindow(data, externalDisplay);
            win.setPosition(externalDisplay.bounds.x + 50, externalDisplay.bounds.y + 50);
        }

        win.setFullScreen(true);

    });


    win.webContents.ipc.on("execute-command", (e, data) => {
        executeCommand(data); //Execute and send output data
    });

    win.once("ready-to-show", async () => {
        win.show();

        if (process.argv.length > 1) { //Warning here for packaging/make ?
            const presentationData = await openCodePrezArchive("./src/main/example.codeprez");

            win.webContents.send("set-codeprez-data", presentationData)
        }
    });

    win.on("close", () => deleteCodePrezTempFolder());

    return win;
};

const menu = Menu.buildFromTemplate([
    process.platform === 'darwin' ? {
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }]
    } : { label: app.name },
    {
        label: "Fichier",
        submenu: [{
            label: "Ouvrir...",
            accelerator: "CmdOrCtrl+O",
            click: () => openFileDialog('codeprez')
        },
        {
            role: process.env.NODE_ENV !== "production" ? 'toggleDevTools' : undefined
        },
        {
            role: process.env.NODE_ENV !== "production" ? 'reload' : undefined
        }
        ]
    }])

Menu.setApplicationMenu(menu);

const createDualSplitWindow = (data: any, externalDisplay: Electron.Display) => {
    const dual = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            preload: join(__dirname, "src/preload/preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    if (app.isPackaged) {
        dual.loadFile("./build/index.html");
    } else {
        dual.loadURL("http://localhost:3000");
    }

    dual.once("ready-to-show", async () => {
        dual?.setFullScreen(true);
        dual?.webContents.send("viewer-mode", { data });
        dual?.show();
    });

    return dual;
}

const separateAndRender = (data: any) => {
    const slides = data?.presentationFileContent?.split(/^---$/gm);

    const createSection = slides?.map((slide: any, index: any) => {
        const dataMd: string = markdownRenderer(data.presentationPath).render(
            slide
        );
        return dataMd;
    });
    return createSection;
};

const initialize = async () => {
    await app.whenReady().then(() => {
        protocol.registerFileProtocol("codeprez", (request, callback) => {
            try {
                const filePath = url.fileURLToPath(
                    "file://" + request.url.slice("codeprez:/".length)
                );
                callback(filePath);
            } catch (error) {
                console.error(error);
                callback("404");
            }
        });
    });
    createWindow();
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
