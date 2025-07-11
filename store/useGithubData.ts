import type { IRecentActivity } from '~/types/recent.activity'
import type { IRateLimit } from '~/types/graphql'

export const useGithubData = reactive({
    isLoadingStatus: false,
    userInfo: {} as any,
    contributions: {} as unknown,
    repositories: {} as any,
    organizations: {} as any,
    languages: {} as any,
    recentActivity: [] as IRecentActivity[],
    sponsors: {} as any,
    sponsoring: {} as any,
    state: {} as any,
    rate: {} as IRateLimit,
})
