import { ProgressInfo, UpdateDownloadedEvent, UpdateInfo } from "electron-updater";

export default interface UpdateInterface {
    mode: number,
    progress?: ProgressInfo,
    info?: UpdateDownloadedEvent | UpdateInfo,
    error?: string
}