<template>
  <div
    :class="prefixCls"
    :style="{
      height: `${paperState.height}px`,
      width: `${paperState.width}px`,
      top: `${paperState.y}px`,
      left: `${paperState.x}px`,
    }"
    @mousemove="(e: MouseEvent) => updateMousePos(e, true)"
    @mouseleave="(e: MouseEvent) => updateMousePos(e, false)"
  >
    <div
      :class="`${prefixCls}-cover`"
      :style="{ backgroundColor: paperState.backgroundColor }"
    ></div>
    <div
      v-if="paperState.backgroundImage"
      :class="`${prefixCls}-cover`"
      :style="{ backgroundImage: `url(${paperState.backgroundImage})` }"
    ></div>
    <slot></slot>
    <div
      :class="`${prefixCls}-grid-line`"
      :style="{
        display: showGrid ? 'block' : 'none',
        backgroundImage: `linear-gradient(-90deg, ${paperState.gridColor} 1px, transparent 1px), linear-gradient(${paperState.gridColor} 1px, transparent 1px)`,
        backgroundSize: `${paperState.gridSize}px ${paperState.gridSize}px,${paperState.gridSize}px ${paperState.gridSize}px`,
      }"
    ></div>
  </div>
</template>

<script lang="ts">
  import type { ComponentInternalInstance } from 'vue'
  import { defineComponent, inject, getCurrentInstance } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import type { VisuePaper } from '../../lib/Paper'

  export default defineComponent({
    name: 'Canvas',
    props: {
      showGrid: {
        type: Boolean,
        required: true,
      },
      paperState: {
        type: Object,
        required: true,
      },
      updateMousePos: {
        type: Function,
        required: true,
      },
    },
    setup() {
      const paper = inject('Paper') as VisuePaper
      const instance = getCurrentInstance() as ComponentInternalInstance
      paper.instanceManager.set('Canvas', {
        model: instance,
      })

      return {
        prefixCls: useDesign(`canvas`),
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-canvas';

  .@{prefix-cls} {
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: grab;

    .cover {
      height: 100%;
      width: 100%;
      position: absolute;
    }

    &-cover {
      .cover();
    }

    &-grid-line {
      .cover();
      pointer-events: none;
    }
  }
</style>
