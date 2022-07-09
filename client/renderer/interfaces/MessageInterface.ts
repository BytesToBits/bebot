export interface Attachment {
    attachment?: string
    contentType?: string
    description?: string
    height?: number
    width?: number
    id?: string
    name?: string
    proxyURL?: string
    size?: number
    url?: string
}

export default interface MessageInterface {
    channelId?: string
    attachments?: Map<string, Attachment>
    author?: {
        id?: string
        bot?: boolean
        accentColor?: string
        avatar?: string
        banner?: string
        discriminator?: string
        flags?: {
            bitfield?: number
        }
        system?: boolean
        username?: string
    }
    content?: string
    createdTimestamp?: number
    editedTimestamp?: number
    guildId?: string
    id?: string
    system?: boolean,
    embeds?: {
        author?: {
            name?: string
            url?: string
            iconURL?: string
            proxyIconURL?: string
        }
        color?: number
        description?: string
        fields?: { name: string, value: string }[]
        footer?: {
            text?: string
            iconURL?: string
            proxyIconURL?: string
        }
        image?: string
        provider?: string
        thumbnail?: string
        timestamp?: number
        title?: string
        url?: string
    }[]
}