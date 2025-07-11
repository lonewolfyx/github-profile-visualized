<template>
    <div
        class="fixed bg-zinc-900 right-[1%] transform-[translate(1%,1%)] bottom-3 z-50 text-gitColor-default/40 px-3 rounded-2xl"
    >
        <span class="text-xs font-mono font-medium">API rate limit: {{ rate.remaining }} / {{ rate.limit }}</span>
    </div>
</template>

<script lang="ts" setup>
import type { IRateLimit } from '~/types/graphql'

defineOptions({
    name: 'ApiRateLimit',
})

const rate = ref<IRateLimit>({
    remaining: 0,
    limit: 0,
    cost: 0,
    used: 0,
    resetAt: '',
})

onMounted(async () => {
    const { rateLimit } = await getGithubRateLimit()
    rate.value = rateLimit
})
</script>
