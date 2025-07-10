<template>
    <div
        v-if="sponsoring.length || sponsoring.length"
        class="space-y-6"
    >
        <CardHeader
            description="Sponsorship received by users in the past time period and personnel who sponsored others"
            title="Sponsors & Supporters"
        />
        <!-- 赞助信息 · 用户在过去时间段内所收到赞助以及赞助他人的人员 -->
        <div class="grid grid-cols-4 gap-4">
            <GithubSponsorsItem
                v-for="items in sponsors"
                :key="items.name"
                :items="items"
                type="sponsors"
            />

            <GithubSponsorsItem
                v-for="items in sponsoring"
                :key="items.name"
                :items="items"
                type="sponsoring"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/store/useGithubData'

const { sponsors, sponsoring } = useGithubData
</script>

<style scoped>

</style>
