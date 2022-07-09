import { ipcMain } from "electron"
import { Updates } from "./Updates"

const init = async() => {
    ipcMain.on('check-updates', Updates.check)
}

export default init