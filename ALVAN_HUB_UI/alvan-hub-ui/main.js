
const { win, BrowserWindow, app } = require('electron');
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    backgroundColor: "lightgrey",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
  });

  win.loadFile('index.html');
};

require('electron-reload')(__dirname, {
  electron: path.join(__dirname,'node_modules','.bin', 'electron')
})

app.whenReady().then(createWindow);