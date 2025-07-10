<template>
    <a
        class="relative border border-default-github rounded flex flex-col gap-4 px-4 py-3 text-left"
        href="#"
        title="sss"
    >
        <div class="relative flex flex-row items-center gap-4">
            <img
                alt="vue"
                class="size-14"
                src="https://avatars.githubusercontent.com/u/65625612?s=200&amp;v=4"
            >
            <div class="relative flex flex-col justify-between items-start w-full h-full">
                <span class="text-sm text-gitColor-default font-mono font-medium">nuxt</span>
                <a
                    class="text-sm text-gray-400 font-mono font-medium"
                    href="#dasd"
                    title="sss"
                >@nuxt</a>
            </div>
            <div class="relative ml-auto rounded p-3 py-2 bg-default-github">
                <span class="text-sm text-gitColor-default font-mono font-medium">{{ randomNumber(2, 100) }}</span>
            </div>
        </div>

        <div class="relative w-full">
            <ul class="space-y-3">

                <GithubTopContributionsItemLink />
                <li class="flex items-center justify-start gap-2">
                    <div class="rounded bg-gray-500 p-[3px] text-gitColor-default text-sm">
                        <Icons
                            height="16"
                            icon="lucide:git-pull-request-draft"
                            width="16"
                        />
                    </div>

                    <a
                        class="line-clamp-1 text-sm text-gitColor-default font-mono font-medium"
                        href="#"
                        target="_blank"
                    >feat(kit,nuxt)!: defer installing modules with installModule</a>
                    <div class="flex items-center gap-1 text-gitColor-default ml-auto">
                        <Icons
                            height="16"
                            icon="lucide:message-square"
                            width="16"
                        />
                        <span class="text-xs font-mono font-medium">{{ randomNumber(2, 100) }}</span>
                    </div>
                </li>
                <li class="flex items-center justify-start gap-2">
                    <div class="rounded bg-purple-500 p-[3px] text-gitColor-default text-sm">
                        <Icons
                            height="16"
                            icon="lucide:git-merge"
                            width="16"
                        />
                    </div>

                    <a
                        class="line-clamp-1 text-sm text-gitColor-default font-mono font-medium"
                        href="#"
                        target="_blank"
                    >chore(deps): update all non-major dependencies (3.x)</a>
                    <div class="flex items-center gap-1 text-gitColor-default ml-auto">
                        <Icons
                            height="16"
                            icon="lucide:message-square"
                            width="16"
                        />
                        <span class="text-xs font-mono font-medium">{{ randomNumber(2, 100) }}</span>
                    </div>
                </li>
                <li class="flex items-center justify-start gap-2">
                    <div class="rounded bg-red-500 p-[3px] text-gitColor-default text-sm">
                        <Icons
                            height="16"
                            icon="lucide:git-pull-request-closed"
                            width="16"
                        />
                    </div>
                    <a
                        class="line-clamp-1 text-sm text-gitColor-default font-mono font-medium"
                        href="#"
                        target="_blank"
                    >chore(deps): update dependency @vitejs/plugin-vue-jsx to v5 (3.x)</a>
                    <div class="flex items-center gap-1 text-gitColor-default ml-auto">
                        <Icons
                            height="16"
                            icon="lucide:message-square"
                            width="16"
                        />
                        <span class="text-xs font-mono font-medium">{{ randomNumber(2, 100) }}</span>
                    </div>
                </li>
                <li class="flex items-center justify-start gap-2">
                    <div class="rounded bg-red-500 p-[3px] text-gitColor-default text-sm">
                        <Icons
                            height="16"
                            icon="lucide:git-pull-request-closed"
                            width="16"
                        />
                    </div>
                    <a
                        class="line-clamp-1 text-sm text-gitColor-default font-mono font-medium"
                        href="#"
                        target="_blank"
                    >docs: Update 07.routing.md</a>
                    <div class="flex items-center gap-1 text-gitColor-default ml-auto">
                        <Icons
                            height="16"
                            icon="lucide:message-square"
                            width="16"
                        />
                        <span class="text-xs font-mono font-medium">{{ randomNumber(2, 100) }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </a>
</template>

<script lang="ts" setup>
import { randomNumber } from 'web-random-utils'
import GithubTopContributionsItemLink from '~/components/Github/TopContributions/link.vue'

defineOptions({
    name: 'GithubTopContributionsItem',
})
</script>

<style scoped>

</style>
