<template>
    <div class="space-y-6">
        <CardHeader
            description="most proficient development language for users in the past"
            title="Most Used Languages"
        />
        <!-- 热门项目语言排行 · 过去用户最熟练的开发语言 -->
        <div
            :class="cn(
                'relative',
                'bg-default-github p-3 space-y-3',
                'border border-default-github rounded',
            )"
        >
            <div class="relative w-full max-w-full h-2 rounded-full overflow-hidden flex">
                <!--                &lt;!&ndash; 黄色 58% &ndash;&gt; -->
                <!--                <div class="bg-yellow-300 flex-none basis-[50%]" /> -->
                <!--                &lt;!&ndash; 绿色 22% &ndash;&gt; -->
                <!--                <div class="bg-green-600 flex-none basis-[20%]" /> -->
                <!--                &lt;!&ndash; 橙色 7% &ndash;&gt; -->
                <!--                <div class="bg-orange-500 flex-none basis-[20%]" /> -->
                <!--                &lt;!&ndash; 紫色 4% &ndash;&gt; -->
                <!--                <div class="bg-purple-600 flex-none basis-[10%]" /> -->
                <div
                    v-for="item in languages"
                    :key="`lgc${item.name}`"
                    :style="{
                        backgroundColor: item.color,
                        flexBasis: `${item.progress}%`,
                    }"
                    class="flex-none"
                />
            </div>
            <div class="grid grid-cols-2 gap-2 gap-x-6">
                <GithubMostUsedLanguagesItemV2
                    v-for="items in languages"
                    :key="`lg${items.name}`"
                    :items="items"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import { useGithubData } from '~/store/useGithubData'

const { languages } = useGithubData
</script>

<style scoped>

</style>
