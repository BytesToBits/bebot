import { Client, Intents } from "discord.js"
import { mainWindow } from "../background"

const intents = new Intents(32767)
export const client = new Client({ intents })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (message) => {
    if(mainWindow) mainWindow.webContents.send('new-message', message.toJSON())
})