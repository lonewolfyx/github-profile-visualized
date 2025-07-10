<template>
    <div class="relative px-4">
        <GithubDataLoader />

        <template v-if="!useGithubData.isLoadingStatus">
            <div class="grid grid-cols-[18rem_auto_18rem] items-center text-white mb-8">
                <div class="flex items-center gap-1 pt-4">
                    <div>
                        <img
                            alt="Github Profile Visualized"
                            class="w-11 h-11"
                            src="/assets/images/logo.svg"
                        >
                    </div>
                    <div class="flex flex-col gap-1 text-sm font-mono">
                        <span class="text-primary">Github Profile</span>
                        <div class="flex items-center gap-4 text-gitColor-default">
                            <span>Visualized</span>
                            <span
                                class="border p-1 text-xs  bg-default-github border-default-github rounded-2xl px-2"
                            >v{{ version }}</span>
                        </div>
                    </div>
                </div>

                <div class="relative w-full h-auto z-10">
                    <DynamicIsland />
                </div>

                <div class="flex justify-end gap-2 pt-4">
                    <Button class="cursor-pointer bg-default-github rounded-2xl hover:bg-slate-600">
                        <Icons
                            height="16"
                            icon="material-symbols-light:download"
                            width="16"
                        />
                    </Button>
                    <Button class="cursor-pointer bg-default-github rounded-2xl hover:bg-rose-600">
                        <Icons
                            height="16"
                            icon="ph:coffee-bold"
                            width="16"
                        />
                    </Button>
                    <Button class="cursor-pointer bg-default-github rounded-2xl hover:bg-slate-600">
                        <Icons
                            height="16"
                            icon="lineicons:paint-roller-1"
                            width="16"
                        />
                    </Button>
                    <!--                <Button class="cursor-pointer bg-default-github rounded-2xl hover:bg-slate-600"> -->
                    <!--                    <Icons -->
                    <!--                        height="16" -->
                    <!--                        icon="hugeicons:sliders-horizontal" -->
                    <!--                        width="16" -->
                    <!--                    /> -->
                    <!--                </Button> -->
                    <Button class="cursor-pointer bg-default-github rounded-2xl hover:bg-slate-600">
                        <Icons
                            height="16"
                            icon="mdi:github"
                            width="16"
                        />
                    </Button>
                </div>
            </div>

            <slot />

            <ApiRateLimit />
        </template>
    </div>
</template>

<script lang="ts" setup>
import DynamicIsland from '~/components/DynamicIsland/index.vue'
import { useGithubData } from '~/store/useGithubData'
import { version } from '~/package.json'
</script>

<style scoped>

</style>
