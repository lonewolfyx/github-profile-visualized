export interface ICommitContributionNode {
    occurredAt: string
}

export interface ICommitContributions {
    contributions: {
        nodes: ICommitContributionNode[]
        totalCount: number
    }
}

export interface ICommitContributionsByRepository {
    commitContributionsByRepository: ICommitContributions[]
}

export interface IIssuesTrend {
    nodes: {
        createdAt: string
    }[]
    totalCount: number
}

export interface IPullRequestsTrend {
    nodes: {
        createdAt: string
    }[]
    totalCount: number
}

export interface IRepositoriesNode {
    id: string
    name: string
    stargazers: {
        totalCount: number
        edges: {
            starredAt: string
        }[]
    }
}

export interface IRepositoriesTrend {
    nodes: IRepositoriesNode[]
}

export interface IRepositoriesTrend {
    commitContributionsByRepository: IRepositoryCommitContributions[]
}

export interface IRepositoryCommitContributions {
    repository: {
        nameWithOwner: string
        isInOrganization: boolean
    }
    contributions: {
        totalCount: number
        nodes: IContributionsNodes[]
    }
}

export interface IContributionsNodes {
    commitCount: number
    occurredAt: string
}

export interface IStatesTrend {
    commitContributionsByRepositoryTrend: IRepositoriesTrend
    repositoriesTrend: IRepositoriesTrend
    pullRequestsTrend: IPullRequestsTrend
    issuesTrend: IIssuesTrend
    commitsTrend: ICommitContributionsByRepository
}

export type UserStateType = 'organization' | 'star' | 'pullRequest' | 'issue' | 'commit'

export interface IRank {
    level: string
    rank: string
    color: string
}

export interface ITransformTrend {
    total: number
    data: number[]
    level: string
    rank: string
    color: string
}

export interface IUserState {
    [key: UserStateType]: {
        name: UserStateType
        total: number
        data: number[]
        level: string
        rank: string
        color: string
    }
}
