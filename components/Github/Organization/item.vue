<template>
    <div class="border border-default-github rounded px-4 py-3 bg-default-github space-y-2">
        <div class="flex justify-between items-center gap-4">
            <div class="flex flex-col justify-between mr-auto max-w-3xs">
                <div
                    class="flex flex-col justify-between items-start gap-2 text-gitColor-default font-mono"
                >
                    <span>{{ items.name }}</span>
                    <a
                        :href="items.url"
                        :title="items.description"
                        class="text-xs"
                        target="_blank"
                    >@{{ items.login }}</a>
                </div>
                <p class="line-clamp-1 text-xs font-medium text-gray-400">
                    {{ items.description }}
                </p>
            </div>
            <div class="relative flex flex-col justify-between">
                <div class="flex -space-x-2 overflow-hidden">
                    <img
                        v-for="member in items.membersWithRole.nodes"
                        :key="member.login"
                        :alt="member.name"
                        :src="member.avatarUrl"
                        class="size-8 rounded-full border-2 border-white"
                    >
                    <div
                        v-if="items.membersWithRole.totalCount > 5"
                        class="flex items-center justify-center size-8 rounded-full border-2 border-white bg-gray-50 text-gray-600 text-xs font-medium"
                    >
                        +{{ items.membersWithRole.totalCount }}
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-between items-center">
            <img
                :alt="items.name"
                :src="items.avatarUrl"
                class="size-6"
            >
            <div class="flex items-center gap-1 text-gray-400">
                <Icons
                    height="16"
                    icon="codicon:repo"
                    width="16"
                />
                <!-- 项目数量 -->
                <span class="text-xs font-medium font-mono">{{ items.repositories.totalCount }} repositories</span>
            </div>
            <div class="flex items-center gap-1 text-gray-400">
                <Icons
                    height="16"
                    icon="lucide:users"
                    width="16"
                />
                <!-- 成员数量 -->
                <span class="text-xs font-medium font-mono">{{ items.membersWithRole.totalCount }} member</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IOrganizationNodes } from '~/types/organizations'

defineOptions({
    name: 'GithubOrganizationItem',
})

const { items } = withDefaults(defineProps<{
    items: IOrganizationNodes
}>(), {})
</script>

<style scoped>

</style>
