import type { DvComponentGroupConfig } from '../../types'

export function getDvComponentSetting(): DvComponentGroupConfig[] {
  return [
    {
      key: 'chart',
      title: '图表组件',
      icon: 'area-chart-outlined',
      components: [
        {
          key: 'dv-bar',
          title: '柱状图',
          __props__: [],
        },
        {
          key: 'dv-bar-stack',
          title: '堆积柱状图',
          __props__: [],
        },
        {
          key: 'dv-strip',
          title: '条形图',
          __props__: [],
        },
        {
          key: 'dv-strip-stack',
          title: '堆积条形图',
          __props__: [],
        },
        {
          key: 'dv-line',
          title: '折线图',
          __props__: [],
        },
        {
          key: 'dv-line-area',
          title: '面积图',
          __props__: [],
        },
        {
          key: 'dv-biaxial',
          title: '双轴图',
          __props__: [],
        },
        {
          key: 'dv-pie',
          title: '饼图',
          __props__: [],
        },
        {
          key: 'dv-radar',
          title: '雷达图',
          __props__: [],
        },
        {
          key: 'dv-funnel',
          title: '漏斗图',
          __props__: [],
        },
        {
          key: 'dv-scatter',
          title: '散点图',
          __props__: [],
        },
        {
          key: 'dv-heatmap',
          title: '热力图',
          __props__: [],
        },
        {
          key: 'dv-tree-map',
          title: '树图',
          __props__: [],
        },
        {
          key: 'dv-liquid-fill',
          title: '计量图',
          __props__: [],
        },
        {
          key: 'dv-word-cloud',
          title: '词云图',
          __props__: [],
        },
        {
          key: 'dv-table',
          title: '二维表',
          __props__: [],
        },
        {
          key: 'dv-table-cross',
          title: '交叉表',
          __props__: [],
        },
      ],
    },
    {
      key: 'search',
      title: '查询组件',
      icon: 'search-outlined',
      components: [],
    },
    {
      key: 'text',
      title: '文本组件',
      icon: 'font-colors-outlined',
      components: [
        {
          key: 'dv-text',
          title: '单文本',
          __props__: [],
        },
        {
          key: 'dv-title',
          title: '标题',
          __props__: [],
        },
        {
          key: 'dv-marquee',
          title: '跑马灯',
          __props__: [],
        },
        {
          key: 'dv-statistic',
          title: '指标卡',
          __props__: [],
        },
        {
          key: 'dv-clock',
          title: '时间',
          __props__: [],
        },
        {
          key: 'dv-weather',
          title: '天气',
          __props__: [],
        },
      ],
    },
    {
      key: 'media',
      title: '多媒体组件',
      icon: 'picture-outlined',
      components: [
        {
          key: 'dv-border',
          title: '边框',
          __props__: [],
        },
        {
          key: 'dv-image',
          title: '图片',
          __props__: [],
        },
      ],
    },
    {
      key: 'advance',
      title: '高级组件',
      icon: 'appstore-add-outlined',
      components: [
        {
          key: 'dv-swiper',
          title: '轮播容器',
          __props__: [],
        },
      ],
    },
  ]
}
