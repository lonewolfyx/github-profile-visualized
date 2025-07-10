import type { ILanguages } from '~/types/languages'

export interface IPrimaryLanguage {
    name?: string
    color?: string
}

export interface ILicenseInfo {
    spdxId: string
    name: string
    key: string
}

export interface IRepositoryNode {
    name: string
    description: string
    nameWithOwner: string
    url: string
    stargazerCount?: number
    forkCount?: number
    forks?: {
        totalCount?: number
    }
    pullRequests?: {
        totalCount?: number
    }
    issues?: {
        totalCount?: number
    }
    createdAt: string
    primaryLanguage: IPrimaryLanguage
    licenseInfo: ILicenseInfo
    languages: ILanguages
}

export interface IRepositories {
    nodes: IRepositoryNode[]
    totalCount?: number
}
