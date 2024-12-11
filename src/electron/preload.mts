export { }
const { contextBridge, ipcRenderer } = await import('electron');
const electronApi = {
    minimize: () => ipcRenderer.send('electron-channel', 'minimize'),
    maximize: () => ipcRenderer.send('electron-channel', 'maximize'),
    close: () => ipcRenderer.send('electron-channel', 'close'),
}
console.log("process.contextIsolated", process.contextIsolated);

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electronAPI', electronApi)
        console.log(electronApi);
    }
    catch (error) {
        console.error(error);
    }
}
else {
    (window as any).electronAPI = electronApi;
    console.log(electronApi);
}
