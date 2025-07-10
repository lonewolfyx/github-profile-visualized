<template>
    <div class="flex items-center justify-start gap-2">
        <div class="rounded bg-green-500 p-[3px] text-gitColor-default text-sm">
            <Icons
                height="16"
                icon="lucide:git-pull-request-arrow"
                width="16"
            />
        </div>

        <a
            class="line-clamp-1 text-sm text-gitColor-default font-mono font-medium"
            href="#"
            target="_blank"
        >fix(nuxt): safe-guard extraPageMetaExtractionKeys</a>
        <div class="flex items-center gap-1 text-gitColor-default ml-auto">
            <Icons
                height="16"
                icon="lucide:message-square"
                width="16"
            />
            <span class="text-xs font-mono font-medium">{{ randomNumber(2, 100) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { randomNumber } from 'web-random-utils'

defineOptions({
    name: 'GithubTopContributionsItemLink',
})
</script>

<style scoped>

</style>
