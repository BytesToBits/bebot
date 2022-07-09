import { app, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import { client } from './discord/main';
import { createWindow } from './helpers';

import IPCEvents from './helpers/IPCEvents';
import DSCEvents from "./discord/events"

import { Updates } from './helpers/Updates';

import utils from "./util"

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow: BrowserWindow | null

(async () => {
  await app.whenReady();

  mainWindow = createWindow('main', {
    minHeight: 800,
    minWidth: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  });

  await mainWindow.loadURL(utils.renderPage("home"));

  if(isProd) {
    Updates.init()
    Updates.check()
  }
  
  IPCEvents()
  DSCEvents()

})();

app.on('window-all-closed', () => {
  app.quit();
  client.destroy()
});

export {
  mainWindow
}