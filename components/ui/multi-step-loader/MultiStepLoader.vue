<template>
    <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="useGithubData.isLoadingStatus"
            class="fixed inset-0 z-[100] flex size-full items-center justify-center backdrop-blur-2xl"
        >
            <div class="flex flex-col gap-4">
                <!-- 步骤列表 -->
                <div
                    v-for="(step, index) in steps"
                    :key="index"
                    class="flex justify-start items-center gap-2"
                >
                    <!-- 状态图标 -->
                    <span class="w-5 h-5 inline-block">
                        <!-- 等待 -->
                        <Icons
                            v-if="step.status === 'pending'"
                            class="text-gray-500"
                            height="16"
                            icon="lucide:circle-dot"
                            width="16"
                        />

                        <!-- 运行中 -->
                        <Icons
                            v-else-if="step.status === 'running'"
                            class="animate-spin text-primary"
                            height="16"
                            icon="lucide:refresh-ccw"
                            width="16"
                        />

                        <!-- 完成 -->
                        <Icons
                            v-else-if="step.status === 'done'"
                            class="text-primary"
                            height="16"
                            icon="lucide:circle-check-big"
                            width="16"
                        />

                        <!-- 失败 → 红色叉 -->
                        <Icons
                            v-else-if="step.status === 'error'"
                            class="text-red-500"
                            height="16"
                            icon="lucide:angry"
                            width="16"
                        />
                    </span>
                    <span class="text-sm font-medium text-gitColor-default tracking-widest">{{ step.label }}</span>
                </div>
            </div>
            <div
                class="absolute inset-x-0 bottom-0 z-[-1] h-full bg-default-github"
            />
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import type { Props, Step } from '~/components/ui/multi-step-loader/index'
import { useGithubData } from '~/store/useGithubData'

const props = withDefaults(defineProps<Props>(), { active: true })

/** 示例步骤 —— 用 setTimeout 模拟异步 */
const steps = reactive<Step[]>(props.steps)

/** 内部标志：流程激活中 */
const flowActive = ref(false)

/** 派生状态 */
const anyRunning = computed(() => steps.some(s => s.status === 'running'))
const hasPending = computed(() => steps.some(s => s.status === 'pending'))

/** 重置所有步骤到 pending */
function resetSteps() {
    steps.forEach(s => (s.status = 'pending'))
    flowActive.value = false
}

/** 当 active 改变时处理 */
watch(
    () => props.active,
    (val) => {
        if (val) {
            // 若激活为 true 并流程未在进行，则启动
            flowActive.value = true
        }
        else {
            // false 时重置
            resetSteps()
        }
    },
    { immediate: true },
)

/** 自动调度串行执行（无显式循环） */
watchEffect(() => {
    if (!flowActive.value) return
    if (anyRunning.value) return

    // 取下一个 pending
    const next = steps.find(s => s.status === 'pending')
    if (!next) {
        // 已无 pending：流程结束
        flowActive.value = false
        return
    }

    next.status = 'running'
    next.action()
        .then(() => {
            next.status = 'done'
        })
        .catch(() => {
            next.status = 'error'
            flowActive.value = false
            console.log('显示错误', flowActive.value)
        })
})
</script>

<style scoped>
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
