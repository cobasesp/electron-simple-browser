const { app, BrowserWindow, BrowserView, ipcMain  } = require('electron');
const path = require('path');

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1360,
        height: 860,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const view = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const webView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.addBrowserView(view);
    mainWindow.addBrowserView(webView);

    const mainWindowBounds = mainWindow.getBounds();

    view.setBounds({ x: 0, y: 0, width: mainWindowBounds.width, height: 35 });
    view.setAutoResize({ width: true, height: true });

    webView.setBounds({ x: 0, y: 35, width: mainWindowBounds.width, height: (mainWindowBounds.height - 92) });
    webView.setAutoResize({ width: true, height: true });

    view.webContents.loadURL(path.join(__dirname, 'index.html'));

    mainWindow.once('ready-to-show',()=>{
        mainWindow.show()
    });

    view.webContents.openDevTools({ mode: "detach" });

    let lastHandle;
    function handleWindowResize(e) {
        e.preventDefault();
        
        // the setTimeout is necessary because it runs after the event listener is handled
        lastHandle = setTimeout(() => {
            if (lastHandle != null) clearTimeout(lastHandle);
            view.setBounds(view.getBounds());
        });
    };

    mainWindow.on("resize", handleWindowResize);

    ipcMain.on('navigate', (event, url) => {
        webView.webContents.loadURL(url);
    });
});
