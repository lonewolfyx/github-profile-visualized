<template>
    <div class="space-y-1">
        <!--        <CardHeader -->
        <!--            description="Contributions made by the user in the last four years." -->
        <!--            title="Contributions Calendar" -->
        <!--        /> -->

        <GithubContributionItem
            v-for="(item, index) in contributions"
            :key="'githubC'+index"
            :item="item"
        />
    </div>
</template>

<script lang="ts" setup>
import GithubContributionItem from '~/components/Github/Contribution/item.vue'
import { useGithubData } from '~/store/useGithubData'

const { contributions } = useGithubData
</script>

<style scoped>

</style>
