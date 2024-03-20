<template>
  <div :class="prefixCls" @mousedown="handleDeactivated">
    <SketchRuler :paperState="paperState">
      <ScreenAdapter
        :scale="editorState.scale"
        :paperState="paperState"
        :draggable="!activeCells.length"
        :resizable="!activeCells.length"
        :padding="padding"
        @drag="(x: number, y: number) => {
          paperState.x = x
          paperState.y = y
        }"
      >
        <Canvas
          :showGrid="editorState.showGrid"
          :paperState="paperState"
          :updateMousePos="(e: MouseEvent, isInside: boolean) => {
            paperState.mousePos = { mouseEvent: e, isInside }
          }"
        >
          <template v-for="cell in layout" :key="cell.key">
            <div
              :id="`${prefixCls}-cell-${cell.key}`"
              :class="`${prefixCls}-cell`"
              :style="calculateCellStyle(cell)"
              @mousedown="(e) => handleActivated(cell, e)"
              @click="(e) => handleActivated(cell, e)"
            >
              <pre :style="{ color: '#333', height: '100%', width: '100%' }">{{ cell }}</pre>
            </div>
          </template>

          <Moveable
            ref="moveableRef"
            className="moveable"
            :target="moveableTarget"
            v-bind="moveableConfig"
            @drag="handleMoveable"
            @rotate="handleMoveable"
            @resize="handleMoveable"
            @dragGroup="handleMoveable"
            @rotateGroup="handleMoveable"
            @resizeGroup="handleMoveable"
          />
        </Canvas>
      </ScreenAdapter>
    </SketchRuler>
  </div>
</template>

<script lang="ts">
  import { uniq } from 'lodash-es'
  import type { Ref, ComponentInternalInstance } from 'vue'
  import { defineComponent, ref, computed, getCurrentInstance, provide, nextTick } from 'vue'
  import Moveable from 'vue3-moveable'
  import { useDesign } from '@/hooks/useDesign'

  import SketchRuler from './SketchRuler.vue'
  import ScreenAdapter from './ScreenAdapter.vue'
  import Canvas from './Canvas.vue'
  import { useMoveable } from './useMoveable'
  import { parents } from '@/utils/dom'

  import type { VisuePaper } from '../../lib/Paper'
  import type { PaperCellState, PaperState } from './constant'

  export default defineComponent({
    name: 'VisuePaper',
    props: {
      editorState: {
        type: Object,
        required: true,
      },
      paper: {
        type: Object,
        required: true,
      },
    },
    components: { SketchRuler, ScreenAdapter, Canvas, Moveable },
    setup(props) {
      const prefixCls = useDesign(`paper`)
      const moveableRef = ref()
      const moveableTarget = computed(() => {
        return activeCells.value.map((key) => `#${prefixCls}-cell-${key}`)
      })

      const padding = 48
      const paperState: Ref<PaperState> = ref({
        width: 1920,
        height: 1080,
        x: -(padding / 2),
        y: -(padding / 2),
        backgroundColor: '#fff',
        backgroundImage: '',
        gridColor: '#0000001A',
        gridSize: 20,
        paperPos: null,
        mousePos: null,
      })

      const {
        layout,
        activeCells,
        lockedCells,
        invisibleCells,
        moveableConfig,
        handleMoveable,
        calculateCellStyle,
      } = useMoveable({
        paper: props.paper as VisuePaper,
        paperState,
      })

      const instance = getCurrentInstance() as ComponentInternalInstance
      props.paper.instanceManager.set('Paper', {
        model: instance,
        layout,
        paperState,
        activeCells,
        lockedCells,
        invisibleCells,
      })
      provide('Paper', props.paper)

      const handleActivated = (cell: PaperCellState, event?: MouseEvent) => {
        const triggerCellActive = props.paper.triggerCellActive.bind(props.paper)

        if (event?.ctrlKey || event?.metaKey) {
          triggerCellActive(uniq([...activeCells.value, cell.key]))
        } else {
          triggerCellActive(cell.key)
        }

        if (!event) return

        nextTick(() => {
          moveableRef.value.setState(
            {
              target: moveableTarget.value,
            },
            () => {
              moveableRef.value.dragStart(event)
            },
          )
        })
      }

      const handleDeactivated = (e: MouseEvent) => {
        const target = e?.target as HTMLElement
        if (
          target.classList.contains(`.${prefixCls}-cell`) ||
          parents(target, `.${prefixCls}-cell`).length ||
          parents(target, '.moveable').length
        ) {
          return
        }
        const triggerCellDeactive = props.paper.triggerCellDeactive.bind(props.paper)
        triggerCellDeactive()
      }

      return {
        prefixCls,
        moveableRef,
        padding,
        layout,
        paperState,
        activeCells,
        moveableTarget,
        moveableConfig,
        calculateCellStyle,
        handleMoveable,
        handleActivated,
        handleDeactivated,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-paper';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;

    &-cell {
      position: absolute;
      overflow: hidden;
      user-select: none;
    }

    :deep(.moveable) {
      --moveable-color: @pink-color;
      --bounds-color: @red-color;
    }
  }
</style>
