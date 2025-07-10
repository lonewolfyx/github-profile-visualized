<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

interface ValueItem {
    date: string | Date
    count: number
}

/* --------------------------------------------------
 *  Props
 * -------------------------------------------------- */
const props = defineProps({
    /** 数据点数组 */
    values: {
        type: Array as PropType<ValueItem[]>,
        required: true,
    },
    /** 结束日期（含当天），默认 today */
    endDate: {
        type: [Date, String, Number] as PropType<Date | string | number>,
        default: () => new Date(),
    },
    /** 颜色阶梯（浅→深），默认 GitHub 绿色系 5 格 */
    rangeColor: {
        type: Array as PropType<string[]>,
        default: () => ['#1A3A33', '#1F6D5C', '#27D5AE', '#3DF7CF', '#7AFFE5'],
    },
    /** 单个格子默认边长（px）。当 autoFit=true 时仅作初始值 */
    squareSize: {
        type: Number,
        default: 13,
    },
    /** 格子间距 */
    gutter: {
        type: Number,
        default: 3,
    },
    /** 是否随容器宽度自适应填满 */
    autoFit: {
        type: Boolean,
        default: true,
    },
    /** 是否显示月份标签 */
    month: {
        type: Boolean,
        default: true,
    },
})

/* --------------------------------------------------
 *  数据准备 & 颜色
 * -------------------------------------------------- */
const valuesMap = computed(() => {
    const map = new Map<string, number>()
    props.values.forEach((v) => {
        const dateStr = new Date(v.date).toISOString().slice(0, 10)
        map.set(dateStr, v.count)
    })
    return map
})

const end = computed(() => new Date(props.endDate))
const start = computed(() => {
    const s = new Date(end.value)
    s.setDate(s.getDate() - 364) // 52×7=364 + 当天
    return s
})

const dates = computed(() => {
    const arr: Date[] = []
    for (let d = new Date(start.value); d <= end.value; d.setDate(d.getDate() + 1)) {
        arr.push(new Date(d))
    }
    return arr
})

const maxCount = computed(() => Math.max(...props.values.map(v => v.count), 0))
const colorScale = computed(() => {
    const steps = props.rangeColor.length - 1
    return Array.from({ length: steps }, (_, i) => ({
        threshold: (maxCount.value / steps) * (i + 1),
        color: props.rangeColor[i + 1],
    }))
})

function getColor(count: number) {
    if (!count) return props.rangeColor[0]
    for (const s of colorScale.value) {
        if (count <= s.threshold) return s.color
    }
    return props.rangeColor[props.rangeColor.length - 1]
}

/* 周分组 */
const weeks = computed(() => {
    const out: { date: Date, count: number, color: string }[][] = []
    let week: { date: Date, count: number, color: string }[] = []
    dates.value.forEach((d, idx) => {
        const key = d.toISOString().slice(0, 10)
        const count = valuesMap.value.get(key) ?? 0
        week.push({ date: new Date(d), count, color: getColor(count) })
        if (d.getDay() === 6 || idx === dates.value.length - 1) {
            out.push(week)
            week = []
        }
    })
    return out
})

/* --------------------------------------------------
 *  自适应尺寸
 * -------------------------------------------------- */
const containerRef = ref<HTMLElement | null>(null)
const innerSquare = ref(props.squareSize)

function calcSquare() {
    if (!props.autoFit || !containerRef.value) return
    const width = containerRef.value.clientWidth
    const cols = weeks.value.length
    const size = (width - cols * props.gutter) / cols
    innerSquare.value = Math.max(2, Math.floor(size))
}

let ro: ResizeObserver | undefined
onMounted(() => {
    calcSquare()
    if (props.autoFit && containerRef.value) {
        ro = new ResizeObserver(calcSquare)
        ro.observe(containerRef.value)
    }
})
onBeforeUnmount(() => {
    ro?.disconnect()
})

/* --------------------------------------------------
 *  月份标签
 * -------------------------------------------------- */
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthLabels = computed(() => {
    if (!props.month) return []
    const labels: { name: string, x: number }[] = []
    let prevMonth = -1

    weeks.value.forEach((week, idx) => {
        const m = week[0].date.getMonth()
        if (m !== prevMonth) {
            labels.push({
                name: monthNames[m],
                x: idx * (innerSquare.value + props.gutter),
            })
            prevMonth = m
        }
    })
    return labels
})

const topPad = computed(() => (props.month ? 18 : 0))

/* --------------------------------------------------
 *  SVG 尺寸
 * -------------------------------------------------- */
const svgWidth = computed(() => weeks.value.length * (innerSquare.value + props.gutter))
const svgHeight = computed(() => topPad.value + 7 * (innerSquare.value + props.gutter))

/* --------------------------------------------------
 *  Tooltip
 * -------------------------------------------------- */
interface TooltipState {
    show: boolean
    x: number
    y: number
    text: string
}

const tooltip = ref<TooltipState>({ show: false, x: 0, y: 0, text: '' })

function handleEnter(e: MouseEvent, date: Date, count: number) {
    const rect = containerRef.value!.getBoundingClientRect()
    tooltip.value = {
        show: true,
        x: e.clientX - rect.left + 10,
        y: e.clientY - rect.top + 10,
        text: `${count == 0 ? 'No' : count} contributions on ${dayjs(date).format('MMMM DD')}`,
    }
}

function handleMove(e: MouseEvent) {
    if (!tooltip.value.show) return
    const rect = containerRef.value!.getBoundingClientRect()
    tooltip.value.x = e.clientX - rect.left + 10
    tooltip.value.y = e.clientY - rect.top + 10
}

function handleLeave() {
    tooltip.value.show = false
}
</script>

<template>
    <div
        ref="containerRef"
        class="heatmap-wrapper"
        @mousemove="handleMove"
    >
        <svg
            :height="svgHeight"
            :width="svgWidth"
            role="img"
        >
            <!-- 月份文字 -->
            <g v-if="props.month">
                <text
                    v-for="label in monthLabels"
                    :key="label.name + label.x"
                    :x="label.x + innerSquare / 2"
                    :y="12"
                    fill="#8b949e"
                    font-size="10"
                >
                    {{ label.name }}
                </text>
            </g>

            <!-- 方块网格 -->
            <g
                v-for="(week, wi) in weeks"
                :key="wi"
                :transform="`translate(${wi * (innerSquare + gutter)}, ${topPad})`"
            >
                <rect
                    v-for="(day, di) in week"
                    :key="day.date.toISOString()"
                    :fill="day.color"
                    :height="innerSquare"
                    :width="innerSquare"
                    :x="0"
                    :y="di * (innerSquare + gutter)"
                    rx="2"
                    @mouseenter="e => handleEnter(e, day.date, day.count)"
                    @mouseleave="handleLeave"
                />
            </g>
        </svg>

        <!-- Tooltip -->
        <div
            v-if="tooltip.show"
            :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
            class="heatmap-tooltip"
        >
            {{ tooltip.text }}
        </div>
    </div>
</template>

<style scoped>
.heatmap-wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

svg {
    display: block;
    width: 100%;
    height: auto;
}

rect {
    transition: fill 0.15s;
}

rect:hover {
    stroke: rgba(0, 0, 0, 0.15);
    stroke-width: 1;
    cursor: pointer;
}

text {
    user-select: none;
}

.heatmap-tooltip {
    position: absolute;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 10;
}
</style>
