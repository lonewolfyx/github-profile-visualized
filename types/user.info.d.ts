import type { IContributions } from '~/types/contribution'

export interface IUserInfo extends IContributions {
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
