<template>
    <div class="space-y-6">
        <CardHeader
            description="Top contributions made by the user in the last year"
            title="Top Contributions"
        />
        <!-- 热门贡献项目排行 · 用户在过去一年中做出的最大贡献。 -->
        <div class="grid grid-cols-4 gap-4">
            <GithubTopContributionsItem />
            <GithubTopContributionsItem />
            <GithubTopContributionsItem />
            <GithubTopContributionsItem />
            <GithubTopContributionsItem />
            <GithubTopContributionsItem />
            <GithubTopContributionsItem />
            <GithubTopContributionsItem />
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>

</style>
