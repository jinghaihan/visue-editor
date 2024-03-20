<template>
  <div :class="prefixCls" :style="{ height: `${state.size}px`, width: `${state.size}px` }">
    <SketchRule
      v-bind="{
        ...state,
        width: state.size,
        height: state.size,
      }"
    />

    <div :class="`${prefixCls}-content`" :style="{ padding: `${state.thick}px` }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, toRefs } from 'vue'
  import SketchRule from 'vue3-sketch-ruler'
  import { useDesign } from '@/hooks/useDesign'

  export default defineComponent({
    name: 'SketchRuler',
    props: {
      paperState: {
        type: Object,
        required: true,
      },
      thick: {
        type: Number,
        required: false,
        default: 20,
      },
    },
    components: { SketchRule },
    setup(props) {
      const { width, height } = toRefs(props.paperState)

      const state = computed(() => {
        return {
          thick: props.thick,
          scale: 1,
          cornerActive: true,
          startX: 0,
          startY: 0,
          horLineArr: [],
          verLineArr: [],
          size: width.value > height.value ? width.value : height.value,
        }
      })

      return {
        prefixCls: useDesign('sketch-ruler'),
        state,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-sketch-ruler';

  .@{prefix-cls} {
    position: absolute;
    top: 0;
    left: 0;

    &-content {
      position: absolute;
      overflow: hidden;
    }
  }

  :deep(.mb-ruler) {
    height: 100%;
    width: 100%;
    position: absolute;
    .line {
      pointer-events: auto;
      position: absolute;
    }
    .line .action {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .line .value {
      pointer-events: none;
      transform: scale(0.83);
    }
    .line .del {
      padding: 3px 5px;
      cursor: pointer;
      visibility: hidden;
    }
    .line:hover .del {
      visibility: visible;
    }
    .line,
    .h-container,
    .v-container {
      position: absolute;
    }
    .h-container .lines,
    .v-container .lines {
      pointer-events: none;
    }
    .h-container:hover .lines,
    .v-container:hover .lines {
      pointer-events: auto;
    }
    .h-container {
      top: 0;
    }
    .h-container .line {
      top: 0;
      height: 100vh;
      padding-left: 5px;
    }
    .h-container .line .action {
      transform: translate(-24px);
    }
    .h-container .line .action .value {
      margin-left: 4px;
    }
    .h-container .indicator {
      top: 0;
      height: 100vw;
    }
    .h-container .indicator .value {
      width: auto;
      padding: 0 2px;
      margin-top: 4px;
      margin-left: 4px;
    }
    .v-container {
      left: 0;
    }
    .v-container .line {
      left: 0;
      width: 100vw;
      padding-top: 5px;
    }
    .v-container .line .action {
      transform: translateY(-24px);
      flex-direction: column;
    }
    .v-container .line .action .value {
      margin-top: 4px;
    }
    .v-container .indicator {
      width: 100vw;
    }
    .v-container .indicator .value {
      left: 0;
      width: auto;
      padding: 0 2px;
      margin-top: -5px;
      margin-left: 2px;
      transform: rotate(-90deg);
      transform-origin: 0 0;
    }
    .style-ruler {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-size: 12px;
      pointer-events: none;
    }
    .style-ruler span {
      line-height: 1;
    }
    .corner {
      z-index: 100;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: auto;
      cursor: pointer;
      box-sizing: content-box;
      transition: all 0.2s ease-in-out;
    }
    .indicator {
      position: absolute;
      pointer-events: none;
    }
    .indicator .value {
      position: absolute;
      background: white;
    }
    .ruler {
      width: 100%;
      height: 100%;
      pointer-events: auto;
    }
    .h-container,
    .v-container {
      z-index: 100;
    }
    .line,
    .indicator {
      border-color: @pink-color !important;
      z-index: 100;
    }
    .indicator .value {
      background: @background-light-color;
      color: @green-color;
    }
    .action {
      color: @green-color;
    }
  }
</style>
