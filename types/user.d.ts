export interface IUser {
    id?: string
    login?: string
    name?: string
    bio?: string
    avatarUrl?: string
    company?: string
    createdAt?: string
    email?: string
    location?: string
    twitterUsername?: string | unknown
    url?: string
    websiteUrl?: string
    status?: string | unknown
    followers: {
        totalCount: number
    }
    following: {
        totalCount: number
    }
}
