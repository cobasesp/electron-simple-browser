module.exports = class Browser {
    mainWindow;
    searchBarView;
    webView;

    constructor(BrowserWindow) {
        this.mainWindow = new BrowserWindow({
            width: 1360,
            height: 860,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        this.searchBarView = new BrowserView({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });
    
        this.webView = new BrowserView({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        // Add views to browserwindow
        this.mainWindow.addBrowserView(view);
        this.mainWindow.addBrowserView(webView);

        // Set window and view bounds and position
        const mainWindowBounds = this.mainWindow.getBounds();
        this.view.setBounds({ x: 0, y: 0, width: mainWindowBounds.width, height: 35 });
        this.view.setAutoResize({ width: true, height: true });
        this.webView.setBounds({ x: 0, y: 35, width: mainWindowBounds.width, height: (mainWindowBounds.height - 92) });
        this.webView.setAutoResize({ width: true, height: true });
    }
}