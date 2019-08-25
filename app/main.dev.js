/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
 
const log =require('electron-log');
//const MenuBuilder =require('./menu');
const path =require('path') 
const { autoUpdater } = require("electron-updater")
 
const edge = require("electron-edge-js");
const electron = require('electron')
 
 
 
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
let HelloElectron = edge.func({
  assemblyFile: `./resources/Electron.dll`,
  typeName: 'Electron.Electron',
  methodName: 'HelloElectron'
})

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }
  
  mainWindow = new BrowserWindow({
    show: false,
    width:1200,
    height:900,
    fullscreen:false,
    autoHideMenuBar:true,
    resizable:true,
    minimizable:true,
    minimizable:true,
    minimizable:true

  });
  
 // mainWindow.webContents.openDevTools();
  console.log(app.getVersion());
  HelloElectron(3, function (error, result) {

    if (error) throw error
    //mainWindow.loadURL(result);
    console.log(result)
  })
 
  mainWindow.loadURL(`http://kingofdinner.realsun.me:1203`);
  
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
   
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
       
     
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  //const menuBuilder = new MenuBuilder(mainWindow);
 // menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
 // new AppUpdater();
 log.transports.file.level = 'info';
 autoUpdater.logger = log;
 autoUpdater.checkForUpdatesAndNotify();
});
