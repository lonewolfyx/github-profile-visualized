<template>
    <MultiStepLoader
        :loading="uiState.isSimpleLoading"
        :prevent-close="true"
        :steps="simpleLoadingSteps"
        @complete="handleComplete"
        @state-change="handleStateChange"
    />
</template>

<script lang="ts" setup>
import { uiState } from '~/components/Github/DataLoader/loader'

interface Step {
    text: string // Display text for the step
    afterText?: string // Text to show after step completion
    async?: boolean // If true, waits for external trigger to proceed
    duration?: number // Duration in ms before proceeding (default: 2000)
    action?: () => void // Function to execute when step is active
}

const simpleLoadingSteps = computed<Step[]>(() => [
    {
        text: 'Checking Payment',
        duration: 100,
        action: () => {
            console.log('Checking Payment')
        },
    },
    // {
    //     text: 'Saving Order',
    //     duration: 9500,
    // },
    // {
    //     text: 'Sending Confirmation Email',
    //     duration: 2500,
    // },
    // {
    //     text: 'Processing Request',
    //     duration: 1800,
    // },
    {
        text: 'Finalizing',
        duration: 1000,
        action: () => {
            uiState.isSimpleLoading = false
        },
    },
])

// Event handlers
function handleStateChange(state: number) {
    // Handle Loading State Change
}

function handleComplete() {
    // Handle Loading Complete
}

onMounted(() => {
    uiState.isSimpleLoading = !uiState.isSimpleLoading
})
</script>

<style scoped>

</style>
