<template>
    <div class="relative border border-default-github rounded p-3 space-y-3">
        <div
            class="flex justify-between items-center pb-3 border border-t-0 border-l-0 border-r-0 border-b-default-github/80"
        >
            <span
                class="border-default-github block relative flex-none overflow-hidden rounded-full border-2 ring-1 ring-default-github size-12"
            >
                <img
                    :alt="items.name"
                    :src="items.avatarUrl"
                    class="size-full object-cover"
                >
            </span>
            <div class="ml-2 flex justify-between flex-col mr-auto text-left text-gitColor-default">
                <a
                    :href="items.url"
                    :title="items.name"
                    class="font-medium"
                    target="_blank"
                >{{ items.name }}</a>
                <div class="flex justify-start items-center gap-3">
                    <span class="text-xs opacity-70">@{{ items.login }}</span>
                    <span
                        :class="cn(
                            'relative border rounded text-xs px-1 py-0.5',
                            type==='sponsors'?'border-primary/18 bg-primary/18 text-primary':'',
                            type==='sponsoring'?'border-amber-500/18 bg-amber-500/18 text-amber-500':'',
                        )"
                    >{{ type }}</span>
                </div>
            </div>
            <div class="flex justify-end gap-3">
                <a
                    v-if="items.url"
                    :class="cn(
                        buttonVariants(),
                        'cursor-pointer bg-default-github rounded-2xl hover:bg-slate-600',
                    )"
                    :href="items.url"
                    :title="items.name"
                    target="_blank"
                >
                    <Icons
                        height="16"
                        icon="mdi:github"
                        width="16"
                    />
                </a>
                <a
                    v-if="items.websiteUrl"
                    :class="cn(
                        buttonVariants(),
                        'cursor-pointer bg-default-github rounded-2xl hover:bg-slate-600',
                    )"
                    :href="items.websiteUrl"
                    :title="items.name"
                    target="_blank"
                >
                    <Icons
                        height="16"
                        icon="uil:desktop"
                        width="16"
                    />
                </a>
            </div>
        </div>
        <div class="flex flex-row justify-between items-center gap-4 text-gitColor-default">
            <div class="flex gap-1 items-end">
                <Icons
                    height="16"
                    icon="mage:users"
                    width="16"
                />
                <span class="text-xs font-medium">{{ formatWithUnit(items.followers?.totalCount) }} followers</span>
            </div>
            <div class="flex gap-1 items-end">
                <Icons
                    height="16"
                    icon="mingcute:user-follow-2-line"
                    width="16"
                />
                <span class="text-xs font-medium">{{ formatWithUnit(items.following?.totalCount) }} following</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import { buttonVariants } from '~/components/ui/button'
import type { IUser } from '~/types/user'
import { formatWithUnit } from '~/utils/utils'

defineOptions({
    name: 'GithubSponsorsItem',
})

const { items, type } = withDefaults(defineProps<{
    items: IUser
    type: string
}>(), {})
</script>

<style scoped>

</style>
