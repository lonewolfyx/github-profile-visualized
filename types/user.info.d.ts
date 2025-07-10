import type { IStatesTrend } from '~/types/state'

export interface IContribution {
    [key: `Y${string}`]: unknown
}

export interface IUserInfo extends IContribution {
    id: string
    login: string
    name: string
    bio: string
    avatarUrl: string
    company: string
    createdAt: string
    email: string
    location: string
    twitterUsername: null
    url: string
    websiteUrl: string
    status: null
    isBountyHunter: boolean
    isCampusExpert: boolean
    isDeveloperProgramMember: boolean
    isEmployee: boolean
    isGitHubStar: boolean
    socialAccounts: {
        nodes: {
            displayName: string
            provider: string
            url: string
        }[]
    }
    followers: {
        totalCount: number
    }
    following: {
        totalCount: number
    }
    repositories: {
        nodes: any
        totalCount?: number
    }
    organizations: {
        nodes: unknown
        totalCount: number
    }
    sponsors: {
        nodes: any
        totalCount: number
    }
    sponsoring: {
        nodes: any
        totalCount: number
    }
}

export interface IRateLimit {
    cost: number
    limit: number
    remaining: number
    used: number
    resetAt: string
}

export interface IGraphql {
    user: IUserInfo
    rateLimit: IRateLimit
}
