import dayjs from 'dayjs'
import { RANKS } from '~/constant/ranks'
import type {
    ICommitContributionsByRepository,
    IIssuesTrend,
    IPullRequestsTrend,
    IRank,
    IRepositoriesTrend,
    IStatesTrend,
    ITransformTrend,
    IUserState,
} from '~/types/state'

/**
 * @description 等级评级参考 https://github.com/ryo-ma/github-profile-trophy/blob/master/src/trophy.ts
 */

const calcTotal = (nums: number[]): number => nums.reduce((sum: number, count: number) => sum + count, 0)

export const transformRank = (total: number, ranks: any): IRank => {
    const defaultRank = {
        level: RANKS.UNKNOWN,
        rank: '-_-~~',
        color: '',
    }

    if (!Array.isArray(ranks) || ranks.length === 0) return defaultRank

    const matched = ranks
        .filter(rank => total >= rank.count)
        .sort((a, b) => b.count - a.count)[0] // 取最大满足条件的

    return matched
        ? {
                level: matched.level,
                rank: matched.rank,
                color: matched.color,
            }
        : defaultRank
}

export const transformOrganizationTrend = (repositories: IRepositoriesTrend): ITransformTrend => {
    const data = Array.from({ length: 12 }, () => 0)

    repositories.commitContributionsByRepository
        .filter(r => r.repository.isInOrganization)
        .forEach((r) => {
            // 如果只关心“提交总数”而不需要天级别，可以直接：
            // monthly[...] += r.contributions.totalCount
            r.contributions.nodes.forEach((c) => {
                // const m = new Date(c.occurredAt).getMonth(); // 0=Jan … 11=Dec
                const m = dayjs(c.occurredAt).month()
                data[m] += c.commitCount
            })
        })

    const total = calcTotal(data.filter(Boolean))

    return {
        total,
        data: data.filter(Boolean),
        ...transformRank(total, [
            { count: 1, level: RANKS.C, rank: 'First Commit', color: 'sky-300' },
            { count: 10, level: RANKS.B, rank: 'Middle Committer', color: 'teal-400' },
            { count: 100, level: RANKS.A, rank: 'High Committer', color: 'emerald-500' },
            { count: 200, level: RANKS.AA, rank: 'Hyper Committer', color: 'lime-600' },
            { count: 500, level: RANKS.AAA, rank: 'Ultra Committer', color: 'yellow-600' },
            { count: 1000, level: RANKS.S, rank: 'Super Committer', color: 'orange-600' },
            { count: 2000, level: RANKS.SS, rank: 'Deep Committer', color: 'rose-600' },
            { count: 4000, level: RANKS.SSS, rank: 'God Committer', color: 'purple-700' },
        ]),
    }
}

export const transformStarTrend = (repositories: IRepositoriesTrend): ITransformTrend => {
    const buckets: Record<string, number> = {} // 例如: { "2024-07": 10, "2024-06": 3 }

    for (const repo of repositories.nodes) {
        for (const edge of repo.stargazers.edges) {
            const key = dayjs(edge.starredAt).format('YYYY-MM') // "YYYY-MM"
            buckets[key] = (buckets[key] || 0) + 1
        }
    }

    const sortedKeys = Object.keys(buckets).sort()
    const data = sortedKeys.map(key => buckets[key])

    const total = calcTotal(data)

    return {
        total,
        data,
        ...transformRank(total, [
            { count: 1, level: RANKS.C, rank: 'First Star', color: 'sky-300' },
            { count: 10, level: RANKS.B, rank: 'Middle Star', color: 'teal-400' },
            { count: 30, level: RANKS.A, rank: 'You are a Star', color: 'emerald-500' },
            { count: 50, level: RANKS.AA, rank: 'High Star', color: 'lime-600' },
            { count: 100, level: RANKS.AAA, rank: 'Super Star', color: 'yellow-600' },
            { count: 200, level: RANKS.S, rank: 'Stargazer', color: 'orange-600' },
            { count: 700, level: RANKS.SS, rank: 'High Stargazer', color: 'rose-600' },
            { count: 2000, level: RANKS.SSS, rank: 'Super Stargazer', color: 'purple-700' },
        ]),
    }
}

export const transformPullRequestsTrend = (prs: IPullRequestsTrend): ITransformTrend => {
    const buckets: Record<string, number> = {} // 例如: { "2024-07": 10, "2024-06": 3 }

    for (const edge of prs.nodes) {
        const key = dayjs(edge.createdAt).format('YYYY-MM') // "YYYY-MM"
        buckets[key] = (buckets[key] || 0) + 1
    }

    const sortedKeys = Object.keys(buckets).sort()
    const data = sortedKeys.map(key => buckets[key])

    const total = calcTotal(data)
    return {
        total,
        data,
        ...transformRank(total, [
            { count: 1, level: RANKS.C, rank: 'First Pull', color: 'sky-300' },
            { count: 10, level: RANKS.B, rank: 'Middle Puller', color: 'teal-400' },
            { count: 20, level: RANKS.A, rank: 'High Puller', color: 'emerald-500' },
            { count: 50, level: RANKS.AA, rank: 'Hyper Puller', color: 'lime-600' },
            { count: 100, level: RANKS.AAA, rank: 'Ultra Puller', color: 'yellow-600' },
            { count: 200, level: RANKS.S, rank: 'Super Puller', color: 'orange-600' },
            { count: 500, level: RANKS.SS, rank: 'Deep Puller', color: 'rose-600' },
            { count: 1000, level: RANKS.SSS, rank: 'God Puller', color: 'purple-700' },
        ]),
    }
}

export const transformIssuesTrend = (issues: IIssuesTrend): ITransformTrend => {
    const buckets: Record<string, number> = {} // 例如: { "2024-07": 10, "2024-06": 3 }

    for (const edge of issues.nodes) {
        const key = dayjs(edge.createdAt).format('YYYY-MM') // "YYYY-MM"
        buckets[key] = (buckets[key] || 0) + 1
    }

    const sortedKeys = Object.keys(buckets).sort()
    const data = sortedKeys.map(key => buckets[key])

    const total = calcTotal(data)

    return {
        total,
        data,
        ...transformRank(total, [
            { count: 1, level: RANKS.C, rank: 'First Issuer', color: 'sky-300' },
            { count: 10, level: RANKS.B, rank: 'Middle Issuer', color: 'teal-400' },
            { count: 20, level: RANKS.A, rank: 'High Issuer', color: 'emerald-500' },
            { count: 50, level: RANKS.AA, rank: 'Hyper Issuer', color: 'lime-600' },
            { count: 100, level: RANKS.AAA, rank: 'Ultra Issuer', color: 'yellow-600' },
            { count: 200, level: RANKS.S, rank: 'Super Issuer', color: 'orange-600' },
            { count: 500, level: RANKS.SS, rank: 'Deep Issuer', color: 'rose-600' },
            { count: 1000, level: RANKS.SSS, rank: 'God Issuer', color: 'purple-700' },
        ]),
    }
}

export const transformCommitTrend = (commits: ICommitContributionsByRepository): ITransformTrend => {
    const buckets: Record<string, number> = {}

    for (const repository of commits.commitContributionsByRepository) {
        for (const contribution of repository.contributions.nodes) {
            const key = dayjs(contribution.occurredAt).format('YYYY-MM') // "YYYY-MM"
            buckets[key] = (buckets[key] || 0) + 1
        }
    }

    const sortedKeys = Object.keys(buckets).sort()
    const data = sortedKeys.map(key => buckets[key])

    const total = calcTotal(data)

    return {
        total,
        data,
        ...transformRank(total, [
            { count: 1, level: RANKS.C, rank: 'First Commit', color: 'sky-300' },
            { count: 10, level: RANKS.B, rank: 'Middle Committer', color: 'teal-400' },
            { count: 100, level: RANKS.A, rank: 'High Committer', color: 'emerald-500' },
            { count: 200, level: RANKS.AA, rank: 'Hyper Committer', color: 'lime-600' },
            { count: 500, level: RANKS.AAA, rank: 'Ultra Committer', color: 'yellow-600' },
            { count: 1000, level: RANKS.S, rank: 'Super Committer', color: 'orange-600' },
            { count: 2000, level: RANKS.SS, rank: 'Deep Committer', color: 'rose-600' },
            { count: 4000, level: RANKS.SSS, rank: 'God Committer', color: 'purple-700' },
        ]),
    }
}

export const transformGithubUserState = (data: IStatesTrend): IUserState => {
    const { commitContributionsByRepositoryTrend, repositoriesTrend, pullRequestsTrend, issuesTrend, commitsTrend } = data

    return {
        // repository: {
        //     name: 'repository',
        //     total: 0,
        //     level: 'S',
        //     rank: 'Super Stargazer',
        //     data: [0, 0, 0]
        // },
        organization: {
            name: 'organization',
            ...transformOrganizationTrend(commitContributionsByRepositoryTrend),
        },
        star: {
            name: 'star',
            ...transformStarTrend(repositoriesTrend),
        },
        pullRequest: {
            name: 'pullRequest',
            ...transformPullRequestsTrend(pullRequestsTrend),
        },
        issue: {
            name: 'issue',
            ...transformIssuesTrend(issuesTrend),
        },
        commit: {
            name: 'commit',
            ...transformCommitTrend(commitsTrend),
        },
    }
}
