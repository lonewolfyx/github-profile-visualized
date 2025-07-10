<template>
    <div class="grid grid-cols-5 gap-6">
        <div
            v-for="keys in Object.keys(state)"
            :key="state[keys].name"
            class="relative"
        >
            <div class="flex justify-between items-center">
                <div class="flex flex-col justify-between font-mono">
                    <span class="text-xl text-gitColor-default">{{ state[keys].name }}</span>
                    <span class="text-xs text-gray-400">{{ state[keys].rank }}</span>
                </div>

                <div class="flex flex-col justify-between font-mono">
                    <span class="text-sm font-mono font-medium text-gitColor-default">{{ state[keys].total }}</span>
                    <span
                        :class="cn(
                            // text-xl font-mono font-bold  text-shadow-[0_1px_2px] text-shadow-orange-500
                            'text-xl font-mono font-bold text-shadow-[0_1px_2px]',
                            `text-${state[keys].color}`,
                            `text-shadow-${state[keys].color}`,
                        )"
                    >{{ state[keys].level }}</span>
                </div>
            </div>
            <div>
                <EchartMini
                    :id="keys"
                    :data="state[keys].data"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/store/useGithubData'
import { cn } from '~/lib/utils'

const { state } = useGithubData
</script>

<style scoped>

</style>
