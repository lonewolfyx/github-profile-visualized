<template>
    <div class="relative overflow-hidden bg-default-github border border-default-github rounded px-4 py-3">
        <p class="text-sm font-medium font-mono text-gray-400">
            {{ dayjs(items.timestamp).format('M/D/YYYY, HH:mm:ss A') }}
        </p>

        <div class="mt-2.5 font-medium text-gitColor-default font-sans text-sm [&_a]:text-primary">
            <div>
                <div class="flex justify-start items-center flex-wrap gap-3">
                    <Icons
                        :icon="`lucide:${icons[items.type]}`"
                        height="16"
                        items=""
                        width="16"
                    />

                    <template v-if="items.type === 'star'">
                        {{ items.action }}} repository
                        <component :is="createRepoLink(items.repo!)" />
                    </template>

                    <template v-if="items.type === 'create'">
                        Created New {{ items.ref?.type }} on
                        <component :is="createRepoLink(items.repo!)" />

                        {{
                            items.ref?.type === 'branch' ? `branch <span
                        class="rounded bg-gray-700 px-1 py-0.5 font-[monospace] text-sm">${items.ref?.name}</span>` : ``
                        }}
                    </template>
                    <template v-if="items.type === 'public'">
                        Made
                        <component :is="createRepoLink(items.repo!)" />
                        public
                    </template>

                    <template v-if="items.type === 'issue'">
                        {{ items.action }} issue <a
                            :href="items.issue?.html_url"
                            :title="items.issue?.title"
                            target="_blank"
                        >{{ items.issue?.title }}</a> on
                        <component :is="createRepoLink(items.repo!)" />
                    </template>

                    <template v-if="items.type === 'pull_request'">
                        {{ items.action }} pull request <a
                            :href="items.pull_request?.url"
                            :title="items.pull_request?.title"
                            target="_blank"
                        >{{
                            items.pull_request?.title
                        }}</a>
                        on
                        <component :is="createRepoLink(items.repo!)" />
                    </template>

                    <template v-if="items.type === 'push'">
                        Pushed {{ items?.size }} commit(s) to
                        <component :is="createRepoLink(items.repo!)" />
                        on branch
                        <span class="rounded bg-gray-700 px-1 py-0.5 font-[monospace] text-sm">{{
                            items?.branch
                        }}</span>
                    </template>
                </div>

                <ol
                    v-if="items.type === 'push'"
                    class="mt-1 list-inside list-disc text-xs md:text-sm text-gray-400"
                >
                    <li
                        v-for="row in items?.commits as Commit"
                        :key="row.sha"
                    >
                        {{ row.message }}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { Commit, IRecentActivity, Repo } from '~/types/recent.activity'

defineOptions({
    name: 'GithubRecentActivityItem',
})

const { items } = withDefaults(defineProps<{
    items: IRecentActivity
}>(), {})

const icons = {
    star: 'star',
    create: items.ref?.type == 'branch' ? 'git-branch' : 'tag',
    issue: 'circle-dot',
    pull_request: 'git-pull-request',
    push: 'git-commit-horizontal',
    public: 'book-marked',
    fork: 'git-fork',
}

const createRepoLink = (item: Repo) => {
    return h('a', {
        href: `https://github.com/${item.name}`,
        title: item.name,
        target: '_blank',
    }, item.name)
}
</script>

<style scoped>

</style>
