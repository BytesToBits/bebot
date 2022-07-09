import electronLog from "electron-log"
import { autoUpdater } from "electron-updater"
import { mainWindow } from "../background"
import { isProd } from "../util"

export default class __Updates__ {
    constructor() {
        electronLog.transports.file.level = "debug"
        autoUpdater.logger = electronLog
    }

    init() {
        autoUpdater.on("update-not-available", () => {
            mainWindow.webContents.send("update", { mode: 0 })
        })

        autoUpdater.on("download-progress", (progress) => {
            mainWindow.webContents.send("update", { mode: 1, progress })
        })

        autoUpdater.on("update-available", (info) => {
            mainWindow.webContents.send("update", { mode: 2, info })
        })

        autoUpdater.on("update-downloaded", (info) => {
            mainWindow.webContents.send("update", { mode: 3, info })

            autoUpdater.quitAndInstall(true, true)
        })

        autoUpdater.on("error", (err) => {
            mainWindow.webContents.send("update", { mode: -1, error: err.message })
        })
    }

    check() {
        if(isProd) autoUpdater.checkForUpdates()
        else mainWindow.webContents.send("update", { mode: 0 })
    }
}

export const Updates = new __Updates__()