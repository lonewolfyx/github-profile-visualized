<template>
    <div
        :class="cn(
            'relative pl-3',
            'before:content-[\' \'] before:absolute before:bg-default-theme/40 before:block before:w-1 before:h-full before:left-0 before:rounded-2xl',
        )"
    >
        <h3 class="text-xl font-semibold text-gitColor-default">
            {{ props.title }}
        </h3>
        <p class="text-sm text-gray-400">
            {{ props.description }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'

defineOptions({
    name: 'CardHeader',
})

interface IHeaderProps {
    title?: string
    description?: string
}

const props = withDefaults(defineProps<IHeaderProps>(), {
    title: '',
    description: '',
})
</script>

<style scoped>

</style>
