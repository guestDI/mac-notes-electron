import { app, BrowserWindow, Menu, ipcMain, nativeTheme, ShareMenu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, '../electron/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    // mainWindow.loadURL(
    //   // eslint-disable-next-line no-undef
    //   process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:5173'
    //     : `file://${path.join(__dirname, '../dist/index.html')}`
    // );

    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.webContents.openDevTools();
    const shareMenu = new ShareMenu({
        text: 'Check out this awesome app!',
        url: 'https://www.electronjs.org/',
    });

    // Attach the sharing menu to the app
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
          {
              label: 'Share',
              submenu: [
                  {
                      label: 'Share via...',
                      click: () => {
                          shareMenu.popup({ window: mainWindow });
                      },
                  },
              ],
          },
      ])
    );
}

const dockMenu = Menu.buildFromTemplate([
    {
        label: 'Quick Note',
        click () { console.log('Quick Note') }
    }, {
        label: 'New Window with Settings',
        submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
        ]
    },
])

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
    // eslint-disable-next-line no-undef
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu)
    }
}).then(createWindow)


ipcMain.on('show-share-menu', () => {
    const shareMenu = new ShareMenu({
        text: 'Check out this awesome app!',
        url: 'https://www.electronjs.org/',
    });
    shareMenu.popup({ window: mainWindow });
});

app.on('window-all-closed', () => {
    // eslint-disable-next-line no-undef
    if (process.platform !== 'darwin') {
        app.quit()
    }
})