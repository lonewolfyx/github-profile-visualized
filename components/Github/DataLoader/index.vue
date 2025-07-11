<template>
    <MultiStepLoader
        :active="useGithubData.isLoadingStatus"
        :steps="steps"
    />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { Step } from '~/components/ui/multi-step-loader'

import {
    fetchAggregateGithubUserData,
    fetchGithubUser,
    fetchGithubUserStatisticsTrend,
} from '~/utils/githubDataRepository'
import { useGithubData } from '~/store/useGithubData'
import { summarizeRepoLanguages, transformContribution } from '~/utils/transform'
import type { IContributionCalendar } from '~/types/contribution'
import { fetchGithubUserRecentActivity } from '~/utils/githubRecentActivity'
import { transformGithubUserState } from '~/utils/parse/state'

const route = useRoute()

const username = ref<string>('')

watch(
    () => route.params.username,
    (newVal) => {
        if (newVal) {
            username.value = newVal as string
            // 调用数据加载逻辑
        }
    },
    {
        immediate: true,
    },
)

const getUserName = (): string => username.value

// init data
const InitializingData = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const username = getUserName() // 假设是同步函数
            const { data } = await fetchGithubUser(username)

            if (!data?.name) {
                return reject(false)
            }

            resolve(true)
        }
        catch (e) {
            reject(false)
        }
    })
}

const distillGithubData = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user, rateLimit } = await fetchAggregateGithubUserData(getUserName())
            const {
                id,
                login,
                name,
                bio,
                avatarUrl,
                company,
                createdAt,
                email,
                location,
                twitterUsername,
                url,
                websiteUrl,
                status,
                isBountyHunter,
                isCampusExpert,
                isDeveloperProgramMember,
                isEmployee,
                isGitHubStar,
                socialAccounts,
                followers,
                following,
            } = user
            useGithubData.userInfo = {
                id,
                login,
                name,
                bio,
                avatarUrl,
                company,
                createdAt,
                email,
                location,
                twitterUsername,
                url,
                websiteUrl,
                status,
                isBountyHunter,
                isCampusExpert,
                isDeveloperProgramMember,
                isEmployee,
                isGitHubStar,
                socialAccounts,
                followers,
                following,
            }

            useGithubData.contributions = Object.fromEntries(
                Array.from({ length: 3 }, (_, i) => {
                    const y = dayjs().year() - i
                    const contribution = user[`Y${y}`] as IContributionCalendar
                    return [`Y${y}`, {
                        year: y,
                        total: contribution?.contributionCalendar?.totalContributions,
                        contributions: transformContribution(contribution),
                    }]
                }),
            )

            useGithubData.repositories = user?.repositories
            useGithubData.organizations = user?.organizations
            useGithubData.languages = summarizeRepoLanguages(user?.repositories?.nodes)?.slice(0, 10)
            useGithubData.sponsors = user?.sponsors?.nodes?.filter((item: any) => !(item && typeof item === 'object' && !Object.keys(item).length))
            useGithubData.sponsoring = user?.sponsoring?.nodes?.filter((item: any) => !(item && typeof item === 'object' && !Object.keys(item).length))
            resolve(true)
        }
        catch (e) {
            reject(false)
        }
    })
}

const distillGithubStatisticsData = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = await fetchGithubUserStatisticsTrend(getUserName())
            useGithubData.state = transformGithubUserState(user)
            resolve(true)
        }
        catch (e) {
            reject(false)
        }
    })
}

const distillGithubRecentActivityData = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            useGithubData.recentActivity = await fetchGithubUserRecentActivity(getUserName())
            resolve(true)
        }
        catch (e) {
            reject(false)
        }
    })
}

const steps: Step[] = [
    { label: 'Github 用户验证中...', action: InitializingData, status: 'pending' },
    { label: 'Github 数据提取中...', action: distillGithubData, status: 'pending' },
    { label: 'Github 统计数据提取中...', action: distillGithubStatisticsData, status: 'pending' },
    { label: 'Github 最近活动提取中...', action: distillGithubRecentActivityData, status: 'pending' },
    {
        label: 'Github 数据分析中...', action: () => new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(true)
                useGithubData.isLoadingStatus = false
            }, 100)
        }), status: 'pending',
    },
]

onMounted(() => {
    useGithubData.isLoadingStatus = !useGithubData.isLoadingStatus
})
</script>
