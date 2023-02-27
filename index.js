const { app, BrowserWindow } = require('electron');

const { join } = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        backgroundColor: 'black',
        webPreferences: {
            preload: join(__dirname, "preload.js")
        }
    })
    if (process.env.NODE_ENV === "production") {
        win.loadFile('dist/index.html')
    } else {
        win.loadURL("http://localhost:3000");
    }
    // win.once("ready-to-show", () => {
    //     win.show();
    // })

    return win;
}

const initialize = async () => {
    await app.whenReady();
    const win = createWindow();
    win.show();
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
initialize();