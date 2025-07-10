<template>
    <div class="relative w-full h-full space-y-6">
        <CardHeader
            description="Contributions, PRs, Issues, and other content submitted by users in the past time period"
            title="Recent Activity"
        />
        <!-- 最近的活动 · 用户在过去时间段内进行提交的贡献、PR、Issues等内容 -->

        <div class="relative overflow-scroll max-h-[45rem]">
            <div class="space-y-4">
                <GithubRecentActivityItem
                    v-for="items in recentActivity as IRecentActivity[]"
                    :key="items.type"
                    :items="items"
                />

                <!--                <GithubRecentActivityItem /> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/store/useGithubData'
import type { IRecentActivity } from '~/types/recent.activity'

const { recentActivity } = useGithubData
</script>

<style scoped>

</style>
