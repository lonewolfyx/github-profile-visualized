import { githubGraphql } from '~/utils/githubGraphql'
import type { IRateLimit } from '~/types/user.info'

export const getGithubRateLimit = async () => {
    const query = `
    query(){
        rateLimit { # 限速信息
            cost
            limit
            remaining
            used
            resetAt
        }
    }
    `
    return await githubGraphql(query, {}) as { rateLimit: IRateLimit }
}
