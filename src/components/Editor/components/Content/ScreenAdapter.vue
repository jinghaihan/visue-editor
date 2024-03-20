<template>
  <div
    :class="prefixCls"
    :style="{ height: `${adapterState.height}px`, width: `${adapterState.width}px` }"
    @wheel="changeScale"
    @mousedown="onMousedown"
    @mousemove="onMousemove"
  >
    <div
      :class="`${prefixCls}-scalebox`"
      :style="{
        height: `${paperState.height}px`,
        width: `${paperState.width}px`,
        transform: `scale(${scale}) translate(-50%, -50%)`,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { debounce } from 'lodash-es'
  import { useResizeObserver } from '@vueuse/core'
  import type { ComponentInternalInstance } from 'vue'
  import {
    defineComponent,
    ref,
    inject,
    toRefs,
    getCurrentInstance,
    nextTick,
    onMounted,
    onBeforeUnmount,
  } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  import type { VisueEditor } from '../../lib/Editor'
  import type { VisuePaper } from '../../lib/Paper'
  import type { DragPosState } from './constant'

  export default defineComponent({
    name: 'ScreenAdapter',
    props: {
      scale: {
        type: Number,
        required: true,
      },
      paperState: {
        type: Object,
        required: true,
      },
      draggable: {
        type: Boolean,
        required: false,
        default: true,
      },
      resizable: {
        type: Boolean,
        required: false,
        default: true,
      },
      padding: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    emits: ['drag'],
    setup(props, { emit }) {
      const editor = inject('Editor') as VisueEditor
      const paper = inject('Paper') as VisuePaper

      const { draggable, resizable } = toRefs(props)

      const adapterState = ref({
        height: props.paperState.width,
        width: props.paperState.height,
      })

      const calculateScale = debounce(() => {
        try {
          const proxy = paper.instanceManager.getProxy('Paper')
          const paperRect = proxy?.$el.getBoundingClientRect()

          if (!paperRect) return

          const { width, height } = paperRect
          adapterState.value.height = height
          adapterState.value.width = width

          const w = (width - props.padding * 2) / props.paperState.width
          const h = (height - props.padding * 2) / props.paperState.height
          const scale = w < h ? w : h

          if (!Number.isNaN(scale)) {
            editor.setScale(Number(scale.toFixed(2)))
          }
        } catch (error) {}
      }, 100)

      const instance = getCurrentInstance() as ComponentInternalInstance
      paper.instanceManager.set('ScreenAdapter', {
        model: instance,
        calculateScale,
      })

      const changeScale = (e: WheelEvent) => {
        if (resizable.value) {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            const scale = parseFloat(
              Math.max(editor.setting.scale.step, props.scale - e.deltaY / 500).toFixed(2),
            )
            editor.setScale(scale)
          }
        }
      }

      const dragPos: DragPosState = {
        x: null,
        y: null,
        startX: null,
        startY: null,
      }

      const onMouseup = () => {
        dragPos.x = null
        dragPos.y = null
        dragPos.startX = null
        dragPos.startY = null
      }

      const onMousedown = (e: MouseEvent) => {
        if (draggable.value) {
          dragPos.x = props.paperState.x
          dragPos.y = props.paperState.y

          dragPos.startX = e.clientX
          dragPos.startY = e.clientY
        }
      }

      const onMousemove = (e: MouseEvent) => {
        if (
          dragPos.x !== null &&
          dragPos.y !== null &&
          dragPos.startX !== null &&
          dragPos.startY !== null
        ) {
          emit(
            'drag',
            dragPos.x + e.clientX - dragPos.startX,
            dragPos.y + e.clientY - dragPos.startY,
          )
        }
      }

      onMounted(() => {
        window.addEventListener('mouseup', onMouseup)
        nextTick(() => {
          const proxy = paper.instanceManager.getProxy('Paper')
          useResizeObserver(proxy?.$el, () => {
            calculateScale()
          })
          calculateScale()
        })
      })

      onBeforeUnmount(() => {
        window.removeEventListener('mouseup', onMouseup)
      })

      return {
        prefixCls: useDesign('screen-adapter'),
        adapterState,
        changeScale,
        onMouseup,
        onMousedown,
        onMousemove,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-screen-adapter';

  .@{prefix-cls} {
    position: relative;
    cursor: grab;
    overflow: hidden;

    &-scalebox {
      position: absolute;
      left: 50%;
      top: 50%;
      transform-origin: 0 0;
      transition: all 0.2s;
    }
  }
</style>
