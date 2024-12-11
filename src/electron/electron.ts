import { app, BrowserWindow, ipcMain, nativeImage, shell } from "electron";
import path from "path";
import url from "url";

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 450,
        minHeight: 400,
        title: "CloseUp 3D viewer",
        icon: nativeImage.createFromPath(path.join(import.meta.dirname, "../favicon.png")),
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            preload: path.join(import.meta.dirname, "preload.mjs")
        },
    });

    window.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    window.loadURL(
        url.format({
            pathname: path.join(import.meta.dirname, "../index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    return window;
}

let window: BrowserWindow;

app.on('ready', () => {
    window = createWindow();
    // window.electronApi = electronApi;
});

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit()
});

app.on('activate', function () {
    if (window == null)
        createWindow()
});

ipcMain.on('electron-channel', (e, args) => {
    console.log(window, args);

    switch (args) {
        case 'minimize':
            window.minimize();
            break;
        case 'maximize':
            if (window.isMaximized())
                window.unmaximize();
            else window.maximize();
            break;
        case 'close':
            app.quit();
            break;
        default:
            break;
    }
});