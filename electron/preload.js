import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electron', {
    saveNote: (note) => ipcRenderer.send('save-note', note),
    loadNotes: (callback) => ipcRenderer.on('load-notes', (_, notes) => callback(notes)),
    getSystemTheme: () => ipcRenderer.invoke('get-system-theme'),
    onSystemThemeChanged: (callback) =>
        ipcRenderer.on('system-theme-changed', callback),
});