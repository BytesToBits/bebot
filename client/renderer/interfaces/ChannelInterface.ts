export interface ChannelInterface {
    type: string;
    guild: string;
    guildId: string;
    parentId: string;
    permissionOverwrites: string[];
    messages: any[];
    threads: any[];
    nsfw: boolean;
    id: string;
    name: string;
    rawPosition: number;
    topic?: any;
    lastMessageId: string;
    rateLimitPerUser: number;
    createdTimestamp: number;
}