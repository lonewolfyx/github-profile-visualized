<template>
    <a
        :href="items.url"
        :title="items.description"
        class="relative border border-default-github rounded bg-default-github flex flex-col px-4 py-3 text-left"
        target="_blank"
    >
        <div class="flex items-center gap-2 text-lg text-gitColor-default font-mono">
            <Icons
                height="16"
                icon="codicon:repo"
                width="16"
            />
            <span>{{ items.nameWithOwner }}</span>
        </div>
        <p class="mb-3 mt-2 line-clamp-1 text-sm font-medium text-gray-400">{{ items.description }}</p>
        <div
            class="mt-auto flex items-center justify-start gap-4 text-gitColor-default/90"
        >
            <div
                v-if="items.primaryLanguage?.color"
                class="flex items-center gap-1"
            >
                <span
                    :style="{
                        backgroundColor: `${items.primaryLanguage?.color}`,
                    }"
                    class="size-3 rounded-full"
                />
                <span class="text-xs font-medium font-mono">{{ items.primaryLanguage?.name }}</span>
            </div>
            <div class="flex items-center gap-1">
                <Icons
                    height="16"
                    icon="solar:star-linear"
                    width="16"
                />
                <!-- star -->
                <span class="text-xs font-medium font-mono">{{ items.stargazerCount }}</span>
            </div>
            <div class="flex items-center gap-1">
                <Icons
                    height="16"
                    icon="ph:git-fork"
                    width="16"
                />
                <!-- fork -->
                <span class="text-xs font-medium font-mono">{{ items.forkCount }}</span>
            </div>
            <div class="flex items-center gap-1">
                <Icons
                    height="16"
                    icon="codicon:issues"
                    width="16"
                />
                <!-- issues -->
                <span class="text-xs font-medium font-mono">{{ items.issues.totalCount }}</span>
            </div>
            <div class="flex items-center gap-1">
                <Icons
                    height="16"
                    icon="si:pull-request-line"
                    width="16"
                />
                <!-- pr -->
                <span class="text-xs font-medium font-mono">{{ items.pullRequests.totalCount }}</span>
            </div>
        </div>
    </a>
</template>

<script lang="ts" setup>
import type { IRepositoryNode } from '~/types/repositories'

defineOptions({
    name: 'GithubRepositoryItem',
})

const { items } = withDefaults(defineProps<{
    items: IRepositoryNode
}>(), {})
</script>

<style scoped>

</style>
