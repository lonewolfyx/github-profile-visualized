<template>
    <div
        ref="chartContainerRef"
        class="w-full h-full"
    >
        <!--        <v-chart -->
        <!--            :option="option" -->
        <!--            class="chart" -->
        <!--        /> -->
        <div :id="'container'+props['id']" />
    </div>
</template>

<script lang="ts" setup>
// import VChart, { THEME_KEY } from 'vue-echarts'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import { GridComponent, TooltipComponent } from 'echarts/components'
// import { UniversalTransition } from 'echarts/features'
//
// defineOptions({
//     name: 'EchartMini',
// })
//
// use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent])
//
// provide(THEME_KEY, 'dark')
//
// const option = reactive({
//     xAxis: {
//         type: 'category',
//         boundaryGap: false,
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         show: false,
//     },
//     grid: {
//         left: 0,
//         right: 10,
//         top: 10,
//         bottom: 0,
//         containLabel: true,
//     },
//     tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'shadow',
//         },
//     },
//     yAxis: {
//         type: 'value',
//         show: false,
//     },
//     series: [
//         {
//             data: [820, 932, 901, 934, 1290, 1330, 1320],
//             type: 'line',
//             areaStyle: {},
//         },
//     ],
// })
import { Chart } from '@antv/g2'

const chartContainerRef = useTemplateRef('chartContainerRef')

const props = withDefaults(defineProps<{
    id: string
    data: number[]
}>(), {})

const element = ref<{
    width: number
    height: number
}>({
    width: 0,
    height: 0,
})

onMounted(() => {
    const { width, height } = chartContainerRef.value!.getBoundingClientRect()
    element.value = { width, height }
    // console.log(element.value)
    const chart = new Chart({
        container: `container${props.id}`,
    })

    chart.options({
        type: 'area',
        width: element.value.width,
        height: 40,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        // data: [
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     // randomNumber(2, 500),
        //     props.data,
        // ],
        data: props.data,
        encode: { x: (_, idx) => idx, y: d => d, shape: 'smooth' },
        scale: { y: { zero: true } },
        style: {
            fill: 'linear-gradient(-90deg, #212830 0%, #7AFFE5 100%)',
            fillOpacity: 0.6,
        },
        animate: { enter: { type: 'fadeIn' } },
        axis: false,
        // 关闭提示
        tooltip: false,
        // interaction: { tooltip: { render: (e, { title, items }) => items[0].value } },
    })

    chart.render()
})
</script>

<style scoped>

</style>
