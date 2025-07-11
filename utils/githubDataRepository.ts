import axios from 'axios'
import {
    contributionsQuery,
    githubGraphql,
    organizationsQuery,
    repositoriesQuery,
    sponsorQuery,
    userInfoQuery,
    useRuntimeConfig,
} from '#imports'
import { trendingQuery } from '~/utils/query'
import type { IGraphql, IUserStatisticsTrend } from '~/types/graphql'

// 获取 GitHub 用户数据
export const fetchGithubUser = async (username: string) => {
    const config = useRuntimeConfig()

    return await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `Bearer ${config.app.github.token}`,
            Accept: 'application/vnd.github+json',
        },
    })
}

// 获取 GitHub 用户数据
export const fetchAggregateGithubUserData = async (username: string): Promise<IGraphql> => {
    const query = `
    query ($login: String!) {
        user(login: $login) {
            ${userInfoQuery}
            ${contributionsQuery()}
            ${repositoriesQuery}
            ${organizationsQuery}
            ${sponsorQuery}
        }
        rateLimit { # 限速信息
            cost
            limit
            remaining
            used
            resetAt
        }
    }`

    console.log(query)
    return await githubGraphql(query, { login: username }) as IGraphql
}

// 获取 Github 用户的统计趋势
export const fetchGithubUserStatisticsTrend = async (username: string): Promise<IUserStatisticsTrend> => {
    const query = `
    query ($login: String!) {
        user(login: $login) {
            ${trendingQuery}
        }
    }`

    console.log(query)
    return await githubGraphql(query, { login: username }) as IUserStatisticsTrend
}
