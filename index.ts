import { app, BrowserWindow } from "electron";
import { join } from "path";

import { readFileMd, markdownHighlight } from "./src/main/ReadFile";

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
        win.loadFile("dist/index.html");
    } else {
        win.loadURL("http://localhost:3000");
    }

    win.maximize();

    return win;
};

const initialize = async () => {
    await app.whenReady();
    const win = createWindow();
    win.webContents.send("read-file-markdown", await readFileMd());

    win.show();
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
