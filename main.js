const { app, BrowserWindow, BrowserView, ipcMain, Menu  } = require('electron');
const path = require('path');
const ContextMenu = require('./ContextMenu')
const BrowserClass = require('./BrowserClass')

app.on('ready', () => {

    // Define Mainwindow
    const mainWindow = new BrowserWindow({
        width: 1360,
        height: 860,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Define Browser top search bar view
    const view = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Define web view
    const webView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname + '/preload.js')
        },
    });

    // Add views to browserwindow
    mainWindow.addBrowserView(view);
    mainWindow.addBrowserView(webView);

    // Set window and view bounds and position
    const mainWindowBounds = mainWindow.getBounds();
    view.setBounds({ x: 0, y: 0, width: mainWindowBounds.width, height: 35 });
    view.setAutoResize({ width: true, height: true });
    webView.setBounds({ x: 0, y: 35, width: mainWindowBounds.width, height: (mainWindowBounds.height - 92) });
    webView.setAutoResize({ width: true, height: true });

    // Handle resize event to avoid bugs resizing webView HTML content
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

    // Load default views (search bar and default page)
    view.webContents.loadURL(path.join(__dirname, 'index.html'));
    webView.webContents.loadURL(path.join(__dirname, 'notab.html'));

    // Show window when app is ready
    mainWindow.once('ready-to-show',()=>{
        mainWindow.show()
    });

    // Open dev tools (just for debug)
    view.webContents.openDevTools({ mode: "detach" });
    webView.webContents.openDevTools({ mode: "detach" });

    // Listeners ------
    // Navigate event launched by searchbar view
    ipcMain.on('navigate', (event, url) => {
        webView.webContents.loadURL(url);
    });

    // When user click a link inside webview
    ipcMain.on('navigation', (event, url) => {
        console.log(url)
        view.webContents.postMessage('port', { url: url })
    });

    // Create new menu
    const menuTemplate = new ContextMenu(webView, Menu);

    // Build the menu using the template
    const menu = Menu.buildFromTemplate(menuTemplate.getTemplate())
    // Menu.setApplicationMenu(menu); // -> this lines is for setup a menu on top of windows
    
    // Listeners que se ejecutan cuando hago lcick derecho en la pantalla, solo quiero que ocurra en la vista web
    webView.webContents.on('context-menu', function() {
        menu.popup(mainWindow, 20, 20);
    })
});
