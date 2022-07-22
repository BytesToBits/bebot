import { channel } from "diagnostics_channel"
import { TextChannel } from "discord.js"
import { ipcMain } from "electron"
import { mainWindow } from "../background"
import { client } from "./main"

const init = async () => {
    ipcMain.handle('discord-login', async (_, token) => {
        try {
            await client.login(token)
            mainWindow.webContents.send("toast", {
                title: "Logged in!",
                description: `Logged in at ${client.user.tag}!`,
                status: "success",
                isClosable: false
            })
        } catch(e) {
            mainWindow.webContents.send("toast", {
                title: "Failed to Login.",
                description: "Could not authenticate as Bot. Make sure you have provided a valid token.",
                status: "error",
                isClosable: false
            })
        }
    })

    ipcMain.handle('get-client', async() => {
        return client.toJSON()
    })

    ipcMain.handle('get-guild', async(_, guildID: string) => {
        return (await client.guilds.fetch(guildID)).toJSON()
    })

    ipcMain.handle('get-channel', async(_, channelID: string) => {
        return (await client.channels.fetch(channelID)).toJSON()
    })

    ipcMain.handle('get-history', async(_, channelID: string) => {

        // @ts-ignore
        const channel: TextChannel = await client.channels.fetch(channelID)
        return (await channel.messages.fetch({ limit: 100 })).toJSON().reverse()
    })

    ipcMain.handle('send-message', async(_, message: string, channelID: string) => {
        if(channelID && message) {

            // @ts-ignore
            const chn: TextChannel = await client.channels.fetch(channelID)
            await chn.send(message)
        }
    })
}

export default init