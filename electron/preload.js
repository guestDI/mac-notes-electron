// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
    saveNote: (note) => ipcRenderer.send('save-note', note),
    loadNotes: (callback) => ipcRenderer.on('load-notes', (_, notes) => callback(notes)),
    getSystemTheme: () => ipcRenderer.invoke('get-system-theme'),
    onSystemThemeChanged: (callback) =>
        ipcRenderer.on('system-theme-changed', callback),
    showShareMenu: () => ipcRenderer.send('show-share-menu'),
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
});