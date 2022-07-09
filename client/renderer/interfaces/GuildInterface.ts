export interface GuildInterface {
    id: string;
    name: string;
    icon: string;
    features: string[];
    commands: any[];
    members: string[];
    channels: string[];
    bans: any[];
    roles: string[];
    stageInstances: any[];
    invites: any[];
    scheduledEvents: any[];
    shardId: number;
    splash: string;
    banner?: any;
    description: string;
    verificationLevel: string;
    vanityURLCode?: any;
    nsfwLevel: string;
    premiumSubscriptionCount: number;
    discoverySplash: string;
    memberCount: number;
    large: boolean;
    premiumProgressBarEnabled: boolean;
    applicationId?: any;
    afkTimeout: number;
    afkChannelId?: any;
    systemChannelId: string;
    premiumTier: string;
    explicitContentFilter: string;
    mfaLevel: string;
    joinedTimestamp: number;
    defaultMessageNotifications: string;
    systemChannelFlags: number;
    maximumMembers: number;
    maximumPresences?: any;
    approximateMemberCount?: any;
    approximatePresenceCount?: any;
    vanityURLUses?: any;
    rulesChannelId: string;
    publicUpdatesChannelId: string;
    preferredLocale: string;
    ownerId: string;
    emojis: string[];
    stickers: string[];
    createdTimestamp: number;
    nameAcronym: string;
    iconURL: string;
    splashURL: string;
    discoverySplashURL: string;
    bannerURL?: any;
}