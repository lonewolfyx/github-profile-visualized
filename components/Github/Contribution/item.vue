<template>
    <div class="relative">
        <div
            class="line-clamp-1 flex items-end gap-3 text-nowrap text-sm font-medium text-gitColor-default"
        >
            <h5 class="text-base font-semibold">
                {{ item.year }}
            </h5>
            <span class="text-xs opacity-70">{{ formatWithThousands(item.total) }} Contributions</span>
        </div>
        <ContributionHeatmap
            :end-date="`${item.year}-12-31`"
            :values="item.contributions"
        />
    </div>
</template>

<script lang="ts" setup>
import type { ITransformedContribution } from '~/types/contribution'
import { formatWithThousands } from '~/utils/utils'

defineOptions({
    name: 'GithubContributionItem',
})

const { item } = withDefaults(defineProps<{
    item: ITransformedContribution
}>(), {})
</script>

<style scoped>

</style>
