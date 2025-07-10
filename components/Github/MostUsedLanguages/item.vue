<template>
    <div class="relative border border-default-github rounded px-3 py-2 w-full">
        <div class="flex justify-start items-center gap-3">
            <img
                alt="vue"
                class="size-10"
                src="https://gitglance.vercel.app/icons/react.svg"
            >
            <div class="relative flex flex-col justify-around w-full h-10">
                <div
                    class="flex justify-between items-center font-mono text-gitColor-default"
                >
                    <span class="text-sm">React</span>
                    <span class="text-xs text-primary/80">50%</span>
                </div>
                <div class="relative w-full h-1 bg-default-github rounded">
                    <div
                        :style="{
                            width: `${43.33}%`,
                        }"
                        class="relative w-full h-full flex-1 bg-primary/80 rounded"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'GithubMostUsedLanguagesItem',
})
</script>

<style scoped>

</style>
