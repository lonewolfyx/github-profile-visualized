import type { IStatesTrend } from '~/types/state'
import type { IContributions } from '~/types/contribution'
import type { IRepositories } from '~/types/repositories'
import type { IOrganizations } from '~/types/organizations'
import type { IUser } from '~/types/user'

export interface IRateLimit {
    cost: number
    limit: number
    remaining: number
    used: number
    resetAt: string
}

export interface ISocialAccountNode {
    displayName: string
    provider: string
    url: string
}

export interface ISocialAccounts {
    nodes?: ISocialAccountNode[]
}

export interface ISponsor {
    nodes: IUser[]
    totalCount: number
}

export interface IUserBaseData extends IContributions {
    id: string
    login: string
    name: string
    bio: string
    avatarUrl: string
    company: string
    createdAt: string
    email: string
    location: string
    twitterUsername: string | null
    url: string
    websiteUrl: string
    status: string | null
    isBountyHunter: boolean
    isCampusExpert: boolean
    isDeveloperProgramMember: boolean
    isEmployee: boolean
    isGitHubStar: boolean
    socialAccounts: ISocialAccounts | null
    followers: {
        totalCount: number
    }
    following: {
        totalCount: number
    }
    repositories?: IRepositories
    organizations?: IOrganizations
    sponsors: ISponsor
    sponsoring: ISponsor
}

export interface IGraphql {
    user: IUserBaseData
    rateLimit: IRateLimit
}

export interface IUserStatisticsTrend {
    user: IStatesTrend
}
