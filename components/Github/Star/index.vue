<template>
    <div class="space-y-6">
        <CardHeader
            description="Projects I've found valuable and bookmarked for inspiration or reference"
            title="Starred Repositories"
        />
        <!-- 热门star项目 · 用户在过去时间段内star的项目 -->

        <div class="grid grid-cols-4 gap-4">
            <GithubRepositoryItem />
            <GithubRepositoryItem />
            <GithubRepositoryItem />
            <GithubRepositoryItem />
            <GithubRepositoryItem />
            <GithubRepositoryItem />
            <GithubRepositoryItem />
            <GithubRepositoryItem />
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>

</style>
