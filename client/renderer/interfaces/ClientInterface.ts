export default interface ClientInterface {
    shard?: boolean,
    user?: string,
    users?: Array<string>,
    channels?: Array<string>,
    guilds?: Array<string>,
    presence?: any,
    application?: string
}