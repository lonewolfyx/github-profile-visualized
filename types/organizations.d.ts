import type { IMembersWithRole } from '~/types/members'

export interface IOrganizationNodeRepositories {
    totalCount: number
}

export interface IOrganizationNodes {
    name: string
    createdAt: string
    avatarUrl: string
    description: string
    email: string | unknown
    location: string
    login: string
    url: string
    websiteUrl: string
    twitterUsername: string | unknown
    repositories: IOrganizationNodeRepositories
    membersWithRole: IMembersWithRole
}

export interface IOrganizations {
    nodes: IOrganizationNodes[]
    totalCount: number
}
