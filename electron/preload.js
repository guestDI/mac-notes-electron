// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
    saveNote: (note) => ipcRenderer.send('save-note', note),
    loadNotes: (callback) => ipcRenderer.on('load-notes', (_, notes) => callback(notes)),
    onSystemThemeChanged: (callback) =>
        ipcRenderer.on('system-theme-changed', callback),
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
    showShareMenu: () => ipcRenderer.send('show-share-menu'),
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
});