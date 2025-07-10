<template>
    <div class="flex justify-start items-center gap-2">
        <span
            :style="{
                backgroundColor: `${items.color}`,
            }"
            class="relative w-3 h-3 rounded-full"
        />
        <span class="text-sm mr-auto text-gitColor-default font-mono">{{ items.name }}</span>
        <span class="text-xs text-gitColor-default font-mono">{{ items.progress }}%</span>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'GithubMostUsedLanguagesItemV2',
})

const { items } = withDefaults(defineProps<{
    items: {
        name?: string
        color?: string
        size?: string
        repoCount?: string
        progress?: string
    }
}>(), {})
</script>

<style scoped>

</style>
