import dayjs from 'dayjs'

const year = dayjs().year()

export const userInfoQuery = `
### 基础信息
id # 用户所在 Github Id
login # 用户的登录名，即 @xxxx
name # 用户的别名
bio # 用户的介绍
avatarUrl # 公共头像的 URL
company # 用户所在的公司
createdAt # 用户创建 Github 的时间
email # 用户的邮箱
location # 用户所在城市
twitterUsername # 用户的 twitter 账户
url # 用户的url
websiteUrl # 用户公开的个人网站
status {
    emoji # 用户状态的表情符号
    message # 用户状态的简单描述
}
isBountyHunter # 是否是 GitHub 安全漏洞赏金计划的参与者
isCampusExpert # 是否是 GitHub Campus Experts 计划的参与者
isDeveloperProgramMember # 是否是 GitHub 开发者计划成员
isEmployee # 是否是 GitHub 员工
isGitHubStar # 是否是 GitHub Stars 计划的成员
socialAccounts(first: 5) {
    # 用户的社交媒体帐户
    nodes {
        displayName # 社交名称
        provider # 社交平台
        url # 社交地址
    }
}

followers {
    # 用户的粉丝
    totalCount # 总数
}
following {
    # 用户正在关注
    totalCount # 总数
}`

// 仓库相关查询
export const repositoriesQuery = `
repositories(
    first: 30
    ownerAffiliations: OWNER
    isFork: false
    orderBy: { field: STARGAZERS, direction: DESC }
) {
    nodes {
        name # 仓库名称
        description # 仓库描述
        nameWithOwner # 仓库归属人
        url # 仓库地址
        stargazerCount # star 数量
        forkCount # fork 数量
        forks {
            totalCount
        }
        pullRequests {
            # PR 数量，包含关闭、合并、开放
            totalCount
        }
        issues {
            # issues 数量
            totalCount
        }
        createdAt # 仓库创建时间
        primaryLanguage {
            # 开发语言
            name # 语言名称
            color # 语言的颜色
        }
        licenseInfo {
            # 许可证
            spdxId # https://spdx.org/licenses指定的短标识符
            name # https://spdx.org/licenses指定的许可证全名
            key # 小写的 xpdxId
        }
        languages(
            first: 10
            orderBy: { field: SIZE, direction: DESC }
        ) {
            edges {
                size # 使用当前语言编写的字节数
                node {
                    color # 语言颜色
                    name # 编程语言
                }
            }
            totalCount # 语言总数
        }
    }
    totalCount # 仓库总数
}`

// 组织相关
export const organizationsQuery = `
organizations(first: 30) {
    # 组织列表
    nodes {
        name # 组织名称
        createdAt # 组织创建的时间
        avatarUrl # 组织头像
        description #组织描述
        email # 组织邮箱
        location # 组织公开资料位置
        login #组织的登录名
        url # 组织地址
        websiteUrl # 组织的公开资料 URL
        twitterUsername # 组织公开的 twitter 账户
        repositories {
            # 组织的仓库总数
            totalCount
        }
        membersWithRole(first: 5) {
            # 组织成员
            nodes {
                id # 用户所在 Github Id
                login # 用户的登录名，即 @xxxx
                name # 用户的别名
                bio # 用户的介绍
                avatarUrl # 公共头像的 URL
                company # 用户所在的公司
                createdAt # 用户创建 Github 的时间
                email # 用户的邮箱
                location # 用户所在城市
                twitterUsername # 用户的 twitter 账户
                url # 用户的url
                websiteUrl # 用户公开的个人网站
                status {
                    emoji # 用户状态的表情符号
                    message # 用户状态的简单描述
                }
            }
            totalCount # 组织的成员总数
        }
    }

    totalCount # 组织总数
}
`

// contributions
export const contributionsQuery = () => {
    return Array.from({ length: 4 }, (_, i) => year - i).map((item: number) => `Y${item}: contributionsCollection(
            from: "${item}-01-01T00:00:00Z"
            to: "${item}-12-31T23:59:59Z"
        ) {
            contributionCalendar { # 贡献日历
                weeks { # 按照周分组
                    contributionDays {
                        date # 日期
                        contributionCount # 当天贡献总数
                    }
                }
                
                totalContributions # 👈 一行就拿到总数
            }
        }`)
}

// 赞助相关内容
export const sponsorQuery = `
sponsors(
    first: 100 # 只要前 100 条
    orderBy: { field: LOGIN, direction: DESC }
) {
    nodes {
        # Organization
        # User
        ... on User {
            login
            name
            url
            avatarUrl
            websiteUrl
            followers {
                # 用户的粉丝
                totalCount # 总数
            }
            following {
                # 用户正在关注
                totalCount # 总数
            }
        }
        # ... on Organization { # 不获取组织
        #     login
        #     name
        #     url
        #     avatarUrl
        #     websiteUrl
        #     membersWithRole {
        #         totalCount
        #     }
        # }
    }
    totalCount
}

sponsoring(
    first: 100 # 只要前 100 条
    orderBy: { field: LOGIN, direction: DESC }
) {
    nodes {
        # Organization
        # User
        ... on User {
            login
            name
            url
            avatarUrl
            websiteUrl
            followers {
                # 用户的粉丝
                totalCount # 总数
            }
            following {
                # 用户正在关注
                totalCount # 总数
            }
        }
        # ... on Organization { 不获取组织
        #     login
        #     name
        #     url
        #     avatarUrl
        #     websiteUrl
        #     membersWithRole {
        #         totalCount
        #     }
        # }
    }
    totalCount
}
`

// 总数相关统计
export const userTotalStatisticsQuery = `

`

// 趋势
export const trendingQuery = `
# organization 组织贡献趋势统计
commitContributionsByRepositoryTrend:contributionsCollection(
    from: "${year}-01-01T00:00:00Z"
    to: "${year}-12-31T23:59:59Z"
) {
    # 近一年给组织贡献的趋势，按照每个月趋势分布
    commitContributionsByRepository(maxRepositories: 100) {
        repository {
            nameWithOwner # 例如 “vercel/next.js”
            isInOrganization # true ▶ 该仓库属于某个 org
        }
        contributions(first: 100) {
            # 一年内的每一次 commit 贡献
            totalCount # 该仓库的提交总数（可直接用）
            nodes {
                commitCount # commit 总数
                occurredAt # commit 创建时间
            } # 单条时间戳，用来做按月归档
        }
    }
}

#  统计仓库 star 趋势
repositoriesTrend: repositories(
    first: 100
    ownerAffiliations: OWNER
    isFork: false
    orderBy: { field: STARGAZERS, direction: DESC }
) {
    nodes {
        id
        name
        # 2️⃣ 对每个仓库抓取 star 事件
        stargazers(
            first: 50
            orderBy: { field: STARRED_AT, direction: DESC }
        ) {
            totalCount # star 总数
            edges {
                starredAt # ⭐ 关键字段：Star 时间戳
            }
        }
    }
}

# 统计 PR 趋势
pullRequestsTrend: pullRequests(
    first: 100
    orderBy: { field: CREATED_AT, direction: DESC }
) {
    nodes {
        createdAt
    }
    totalCount
}

# 统计 issues 趋势
issuesTrend: issues(
    first: 100
    orderBy: { field: CREATED_AT, direction: DESC }
) {
    nodes {
        createdAt
    }
    totalCount
}

# commits 提交趋势
commitsTrend: contributionsCollection(
    from: "${year}-01-01T00:00:00Z"
    to: "${year}-12-31T23:59:59Z"
) {
    commitContributionsByRepository {
        contributions(first: 100) {
            nodes {
                occurredAt
            }
            totalCount
        }
    }
}
`
