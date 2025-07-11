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

export interface IUsers {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    user_view_type: string
    site_admin: boolean
    name: string
    company: string
    blog: string
    location: string
    email: string | null
    hireable: string | null
    bio: string
    twitter_username: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
}
