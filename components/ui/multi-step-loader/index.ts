/** 步骤状态 */
export type StepStatus = 'pending' | 'running' | 'done' | 'error'

/** 步骤接口 */
export interface Step {
    label: string
    action: () => Promise<boolean>
    status: StepStatus
    errorText?: string
}

/**
 * Props
 * active=true  → 开始（若当前未运行）
 * active=false → 重置回 pending
 */
export interface Props {
    active?: boolean
    steps: Step[]
}

export { default as MultiStepLoader } from './MultiStepLoader.vue'
