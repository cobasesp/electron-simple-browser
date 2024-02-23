module.exports = class ContextMenu {

    template;
    webView;

    constructor(webView) {
        this.webView = webView;
        this.template = [
            {
                label: 'Menu Item 1',
                click: () => { this.webView.webContents.send('test-menu', {'test':'funciona'}); }
            },
            { type: 'separator' },
            { 
                label: 'Menu Item 2', 
                type: 'checkbox', 
                checked: true 
            }
        ];
    }

    getTemplate() {
        return this.template;
    }
}