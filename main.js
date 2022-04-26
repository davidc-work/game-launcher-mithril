const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const { parentPort } = require('worker_threads');

const contextMenu = require('electron-context-menu');
contextMenu({
    showInspectElement: true
});

require('electron-reload')(__dirname);

app.on('browser-window-created', (_, window) => {
    require("@electron/remote/main").enable(window.webContents)
})
require('@electron/remote/main').initialize();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 830,
        minWidth: 1000,
        minHeight: 530,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
    win.setMenu(null);

    return win;
}

app.whenReady().then(() => {
    const win = createWindow();

    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows().length) createWindow();
    });

    const globalShortcut = electron.globalShortcut;

    globalShortcut.register('CommandOrControl+R', function () {
        win.reload();
    });

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        win.webContents.isDevToolsOpened() ? win.webContents.closeDevTools() : win.webContents.openDevTools();
    });
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
});