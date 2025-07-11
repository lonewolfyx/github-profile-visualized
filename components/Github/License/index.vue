<template>
    <div class="space-y-6">
        <CardHeader
            description="Licenses used by users to develop projects in the past period of time"
            title="License Usage"
        />
        <!-- 许可证信息 · 用户在过去时间段内开发项目所使用到的许可证 -->
        <div
            ref="licenseChartContainerRef"
            class="w-full h-[800px] bg-default-github rounded"
        >
            <div id="licenseContainer" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Chart } from '@antv/g2'
import { randomNumber } from 'web-random-utils'

const licenseChartContainerRef = useTemplateRef('licenseChartContainerRef')

const element = ref<{
    width: number
    height: number
}>({
    width: 0,
    height: 0,
})

onMounted(() => {
    const { width, height } = licenseChartContainerRef.value!.getBoundingClientRect()
    element.value = { width, height }
    const chart = new Chart({
        container: 'licenseContainer',
    })

    chart.options({
        type: 'treemap',
        width: element.value.width,
        height: element.value.height,
        layout: { tile: 'treemapBinary', paddingInner: 5 },
        paddingLeft: 0,
        paddingRight: 0,
        // data: [
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        //     randomNumber(2, 500),
        // ],
        data: {
            value: {
                name: '证书',
                children: [
                    { name: 'AFL-3.0', value: randomNumber(2, 500) },
                    { name: 'Apache-2.0', value: randomNumber(2, 500) },
                    { name: 'Artistic-2.0', value: randomNumber(2, 500) },
                    { name: 'BSL-1.0', value: randomNumber(2, 500) },
                    { name: 'BSD-2-Clause', value: randomNumber(2, 500) },
                    { name: 'BSD-3-Clause', value: randomNumber(2, 500) },
                    { name: 'BSD-3-Clause-Clear', value: randomNumber(2, 500) },
                    { name: 'BSD-4-Clause', value: randomNumber(2, 500) },
                    { name: '0BSD', value: randomNumber(2, 500) },
                    { name: 'CC', value: randomNumber(2, 500) },
                    { name: 'CC0-1.0', value: randomNumber(2, 500) },
                    { name: 'CC-BY-4.0', value: randomNumber(2, 500) },
                    { name: 'CC-BY-SA-4.0', value: randomNumber(2, 500) },
                    { name: 'WTFPL', value: randomNumber(2, 500) },
                    { name: 'ECL-2.0', value: randomNumber(2, 500) },
                    { name: 'EPL-1.0', value: randomNumber(2, 500) },
                    { name: 'EPL-2.0', value: randomNumber(2, 500) },
                    { name: 'EUPL-1.1', value: randomNumber(2, 500) },
                    { name: 'AGPL-3.0', value: randomNumber(2, 500) },
                    { name: 'GPL', value: randomNumber(2, 500) },
                    { name: 'GPL-2.0', value: randomNumber(2, 500) },
                    { name: 'GPL-3.0', value: randomNumber(2, 500) },
                    { name: 'LGPL', value: randomNumber(2, 500) },
                    { name: 'LGPL-2.1', value: randomNumber(2, 500) },
                    { name: 'LGPL-3.0', value: randomNumber(2, 500) },
                    { name: 'ISC', value: randomNumber(2, 500) },
                    { name: 'LPPL-1.3c', value: randomNumber(2, 500) },
                    { name: 'MS-PL', value: randomNumber(2, 500) },
                    { name: 'MIT', value: randomNumber(2, 500) },
                    { name: 'MPL-2.0', value: randomNumber(2, 500) },
                    { name: 'OSL-3.0', value: randomNumber(2, 500) },
                    { name: 'PostgreSQL', value: randomNumber(2, 500) },
                    { name: 'OFL-1.1', value: randomNumber(2, 500) },
                    { name: 'NCSA', value: randomNumber(2, 500) },
                    { name: 'Unlicense', value: randomNumber(2, 500) },
                    { name: 'Zlib', value: randomNumber(2, 500) },
                ],
            },
            // {
            //     market: 'Birmingham, AL',
            //     segment: 'Almond lovers',
            //     value: 3840,
            // },
            // {
            //     market: 'Birmingham, A2L',
            //     segment: 'Berry buyers',
            //     value: 1920,
            // },
            // {
            //     market: 'Birmingham, A3L',
            //     segment: 'Carrots-n-more',
            //     value: 960,
            // },
            // {
            //     market: 'Birmingham, A42L',
            //     segment: 'Delicious-n-new',
            //     value: 400,
            // },
            // {
            //     market: 'Birmingham, A52L',
            //     segment: 'Almond lovers',
            //     value: 1600,
            // },

            // value: {
            //     name: '商品',
            //     children: [
            //         {
            //             name: '文具',
            //             children: [
            //                 {
            //                     name: '笔',
            //                     children: [
            //                         { name: '铅笔', value: 430 },
            //                         { name: '圆珠笔', value: 530 },
            //                         { name: '钢笔', value: 80 },
            //                         { name: '水彩', value: 130 },
            //                     ],
            //                 },
            //                 { name: '铅笔盒', value: 30 },
            //                 { name: '直尺', value: 60 },
            //                 { name: '笔记本', value: 160 },
            //                 { name: '其他', value: 80 },
            //             ],
            //         },
            //         {
            //             name: '零食',
            //             children: [
            //                 { name: '饼干', value: 280 },
            //                 { name: '辣条', value: 150 },
            //                 { name: '牛奶糖', value: 210 },
            //                 { name: '泡泡糖', value: 80 },
            //                 {
            //                     name: '饮品',
            //                     children: [
            //                         { name: '可乐', value: 122 },
            //                         { name: '矿泉水', value: 244 },
            //                         { name: '果汁', value: 49 },
            //                         { name: '牛奶', value: 82 },
            //                     ],
            //                 },
            //                 { name: '其他', value: 40 },
            //             ],
            //         },
            //         { name: '其他', value: 450 },
            //     ],
            // },
        },
        // encode: { x: 'market', y: 'value', color: 'segment' },
        // transform: [
        //     { type: 'flexX', reducer: 'sum' },
        //     { type: 'stackY' },
        //     { type: 'normalizeY' },
        // ],
        // scale: { x: { paddingOuter: 0, paddingInner: 0.01 } },
        // // 坐标轴
        // axis: { y: false, x: false },
        // labels: [
        //     {
        //         text: 'segment',
        //         x: 5,
        //         y: 5,
        //         textAlign: 'start',
        //         textBaseline: 'top',
        //         fontSize: 10,
        //         fill: '#fff',
        //     },
        //     {
        //         text: 'value',
        //         x: 5,
        //         y: 5,
        //         textAlign: 'start',
        //         dy: 15,
        //         fontSize: 10,
        //         fill: '#fff',
        //     },
        // ],
        encode: { value: 'value' },
        style: {
            // text: 'value',
            // labelFill: '#000',
            // labelStroke: '#fff',
            // labelLineWidth: 1.5,
            labelFontSize: 12,
            labelPosition: 'top-left',
            labelDx: 5,
            labelDy: 5,
        },
        interaction: { treemapDrillDown: { breadCrumbY: 12, activeFill: '#873bf4' } },

        tooltip: { items: ['value'] },
        // 图列文档 https://g2.antv.antgroup.com/manual/component/legend#itemlabel
        legend: {
            color: {
                itemLabelFill: '#d1d7e0',
            },
        },

    })

    chart.render()
})
</script>

<style scoped>

</style>
