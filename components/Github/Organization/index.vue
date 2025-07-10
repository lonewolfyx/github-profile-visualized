<template>
    <div class="space-y-6">
        <CardHeader
            description="Communities and teams I collaborate with to build impactful solutions"
            title="Organizations"
        />
        <!-- 组织信息列表 · 与我合作构建有影响力解决方案的社区和团队 -->
        <div class="space-y-4 relative w-full overflow-scroll h-[22.5rem]">
            <GithubOrganizationItem
                v-for="item in organizations?.nodes"
                :key="`${item.login}|${item.name}`"
                :items="item"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/store/useGithubData'

const { organizations } = useGithubData
</script>

<style scoped>

</style>
