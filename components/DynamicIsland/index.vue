<template>
    <div class="flex justify-center self-start items-center">
        <div
            :class="cn(
                'relative bg-zinc-900 p-3 px-5 rounded-b-xl shadow-xl/30',
                'after:content-[\'\'] after:absolute after:top-0 after:w-5 after:h-5 after:-left-5',
                'after:bg-radial-[circle_at_bottom_left,transparent_20px,_theme(colors.zinc.900)_21px]',
                'before:content-[\'\'] before:absolute before:top-0 before:w-5 before:h-5 before:-right-5',
                'before:bg-radial-[circle_at_bottom_right,transparent_20px,_theme(colors.zinc.900)_21px]',
            )"
        >
            <div class="flex flex-wrap gap-4 ">
                <a
                    :href="userInfo.url"
                    :title="userInfo.name"
                    class="relative w-12 h-12 rounded-full shadow-[0_0_5px_1px_theme(color.default.theme)]"
                >
                    <img
                        :src="userInfo.avatarUrl"
                        alt="userInfo.name"
                        class="rounded-full w-12 h-12"
                    >
                </a>

                <div class="flex flex-col text-gitColor-default">
                    <div class="space-x-5  font-sans">
                        <a
                            :href="userInfo.url"
                            :title="userInfo.name"
                            class="text-sm font-bold"
                        >{{ userInfo.name }}</a>
                        <span class="text-xs">@{{ userInfo.login }}</span>
                    </div>
                    <div class="flex flex-row gap-4 mt-auto">
                        <div class="flex gap-1 items-end">
                            <Icons
                                height="16"
                                icon="mage:users"
                                width="16"
                            />
                            <span class="text-xs font-medium">{{ formatWithUnit(userInfo.followers?.totalCount, 2) }} followers</span>
                        </div>
                        <div class="flex gap-1 items-end">
                            <Icons
                                height="16"
                                icon="tabler:user-star"
                                width="16"
                            />
                            <span class="text-xs font-medium">{{ formatWithUnit(userInfo.following?.totalCount, 2) }} following</span>
                        </div>
                        <div class="flex gap-1 items-end">
                            <Icons
                                height="16"
                                icon="lucide:map-pinned"
                                width="16"
                            />
                            <span class="text-xs font-medium">{{ userInfo.location }}</span>
                        </div>
                        <div
                            v-if="userInfo.websiteUrl"
                            class="flex gap-1 items-end"
                        >
                            <Icons
                                height="16"
                                icon="lucide:monitor-smartphone"
                                width="16"
                            />
                            <span class="text-xs font-medium">{{ userInfo.websiteUrl }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import { useGithubData } from '~/store/useGithubData'
import { formatWithUnit } from '~/utils/utils'

defineOptions({
    name: 'DynamicIsland',
})

const { userInfo } = useGithubData
</script>

<style scoped>

</style>
