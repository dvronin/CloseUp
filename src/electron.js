import { app, BrowserWindow } from "electron"
import path from "path";
import url from "url"

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600
    });

    window.loadURL(
        url.format({
            pathname: "./dist/index.html",
            protocol: "file:",
            slashes: true
        })
    );
    window.on('closed', function () {
        window = null
    })
}
// console.log(app);
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit()
})

app.on('activate', function () {
    if (window == null)
        createWindow()
})