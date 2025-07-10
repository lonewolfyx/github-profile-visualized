<template>
    <div class="space-y-6">
        <CardHeader
            description="Projects developed over the past year have received significant attention"
            title="Top Projects"
        />
        <!-- 热门项目排行 · 过去一年开发的项目受到了广泛关注 -->
        <div class="space-y-4">
            <GithubRepositoryItem
                v-for="items in repositories?.nodes?.slice(0, 4)"
                :key="items.name"
                :items="items"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/store/useGithubData'

const { repositories } = useGithubData
</script>

<style scoped>

</style>
