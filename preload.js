const { ipcRenderer } = require('electron')

setTimeout(()=> {
    var anchors = document.getElementsByTagName('a');
    for (let i = 0; i < anchors.length; i++) {
        const element = anchors[i];
        element.addEventListener('click', (event) => {
            const href = event.currentTarget.href;
            ipcRenderer.send('navigation', href)
        })
    }
}, 500);
