import type { IContributionCalendar, IContributionDays, ITransformedContributionData } from '~/types/contribution'
import type { IRepositoryNode } from '~/types/repositories'

/**
 * 贡献日历数据转换
 * @param data
 */
export const transformContribution = (data: IContributionCalendar): ITransformedContributionData[] => {
    return data.contributionCalendar?.weeks
        ?.filter((w): w is {
            contributionDays: IContributionDays[]
        } => !!w.contributionDays)
        .flatMap(w => w.contributionDays)
        .map((i: IContributionDays) => ({
            date: i.date,
            count: i.contributionCount,
        })) ?? []
}

/**
 * 语言占比数据转换
 * @param repos
 */
// export const transformLanguageSize = (repos: IRepositoryNode[]) => {
//     let languages = { totalSize: 0 }
//
//     repos?.forEach((repo) => {
//         repo.languages.edges.forEach(({ node: { name }, size }) => {
//             if (languages[name]) languages[name] += size
//             else languages[name] = size
//             languages.totalSize += size
//         })
//     })
//
//     for (const lang in languages) {
//         if (lang === 'totalSize') continue
//         languages[lang] = ((languages[lang] / languages.totalSize) * 100).toFixed(2)
//     }
//
//     delete languages.totalSize
//
//     languages = Object.entries(languages).map(([name, size]) => ({ name, size }))
//     languages.sort((a, b) => b.size - a.size)
//
//     return languages.slice(0, 8)
// }

/**
 * 汇总所有仓库的语言用量，并按大小降序返回。
 * @param repos           仓库列表
 */
export const summarizeRepoLanguages = (repos: IRepositoryNode[]) => {
    const langMap = new Map<
        string,
        { name: string, color?: string, size: number, repoCount: number }
    >()

    for (const repo of repos) {
        if (!repo.languages?.edges?.length) continue

        // 本仓库中出现过的语言，用来避免同一仓库多次累计 repoCount
        const seenInThisRepo = new Set<string>()

        for (const edge of repo.languages.edges) {
            if (!edge?.node?.name || typeof edge.size !== 'number') continue

            const key = edge.node.name
            const entry = langMap.get(key) ?? {
                name: key,
                color: edge.node.color,
                size: 0,
                repoCount: 0,
            }

            entry.size += edge.size

            if (!seenInThisRepo.has(key)) {
                entry.repoCount += 1
                seenInThisRepo.add(key)
            }

            langMap.set(key, entry)
        }
    }

    const totalSize = [...langMap.values()].reduce((s, l) => s + l.size, 0)

    return [...langMap.values()]
        .sort((a, b) => b.size - a.size)
        .map(l => ({
            ...l,
            progress: ((l.size / totalSize) * 100).toFixed(2), // 百分比字符串，保留两位小数
        }))
}
