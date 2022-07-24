export default interface RoleInterface {
    guild: string;
    icon?: any;
    unicodeEmoji?: any;
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    rawPosition: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    createdTimestamp: number;
}