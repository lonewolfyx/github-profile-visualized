<template>
    <div
        v-if="!useGithubData.isLoadingStatus"
        class="space-y-12 pb-10"
    >
        <GithubStats />

        <div
            :class="cn(
                'relative grid grid-cols-12 gap-6',
            )"
        >
            <div class="col-span-4 space-y-2">
                <GithubContribution />
                <GithubOrganization />
            </div>

            <div class="col-span-4 space-y-6 ">
                <GithubMostUsedLanguages />
                <GithubTopProjects />
            </div>

            <div class="col-span-4 relative">
                <GithubRecentActivity />
            </div>
        </div>

        <GithubSponsors />
    </div>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/store/useGithubData'
import { cn } from '~/lib/utils'

definePageMeta({
    layout: 'profile',
})
</script>

<style scoped>

</style>
