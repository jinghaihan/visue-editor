<template>
  <div :class="prefixCls">
    <a-space direction="vertical">
      <div :class="`${prefixCls}-search`">
        <a-input-search placeholder="组件名称" @search="(value: string) => (query = value)" />
      </div>

      <div :class="`${prefixCls}-list`">
        <div v-for="group in componentSetting" :key="group.key">
          <a-divider>
            <a-space>
              <Icon :type="group.icon" />
              {{ group.title }}
            </a-space>
          </a-divider>

          <a-row :gutter="[8, 8]">
            <a-col
              :span="12"
              v-for="component in group.components"
              :key="component.key"
              v-show="isComponentVisible(component)"
              class="draggable-el"
              @mousedown="(e: MouseEvent) => onMousedown(e, component)"
            >
              <a-card
                size="small"
                :title="component.title"
                :headStyle="{
                  fontSize: '12px',
                  padding: '0 8px',
                  minHeight: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }"
                hoverable
              >
                <template #cover>
                  <Icon class="draggable-ghost" :type="`svg-${component.key}`" />
                </template>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, onMounted, onBeforeUnmount } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import type { VisueEditor } from '../../../lib/Editor'
  import type { DvComponentGroupConfig, DvComponentConfig } from '../../../types'
  import type { PaperCellState } from '../../Content/constant'
  import { useDraggable } from './useDraggable'

  export default defineComponent({
    setup() {
      const editor = inject('Editor') as VisueEditor
      const componentSetting = editor.instanceManager.get('Editor')
        ?.componentSetting as DvComponentGroupConfig[]

      const query = ref('')

      const isComponentVisible = (component: DvComponentConfig) => {
        return !query.value ? true : component.title.includes(query.value)
      }

      const getEditorContainer = () => {
        return editor.instanceManager.getProxy('Editor')?.$el || document.body
      }

      const getCanvasContainer = () => {
        const Paper = editor.getActivePaper()
        return Paper.instanceManager.getProxy('Canvas')?.$el
      }

      const getScale = () => {
        return editor.instanceManager.get('Editor')?.editorState.value.scale
      }

      const dropped = (cell: PaperCellState) => {
        const Paper = editor.getActivePaper()
        const { mousePos } = Paper.instanceManager.get('Paper')?.paperState.value

        if (mousePos.isInside) {
          const rect = getCanvasContainer().getBoundingClientRect()

          if (
            cell.x < 0 ||
            cell.y < 0 ||
            cell.x + cell.w > rect.width / getScale() ||
            cell.y + cell.h > rect.height / getScale()
          ) {
            return
          }

          Paper.addCell(cell)
          Paper.triggerCellActive(cell.key)
        }
      }

      const { onMousedown, onMousemove, onMouseup, onMouseleave, onblur } = useDraggable({
        getRelativeContainer: getEditorContainer,
        getDropContainer: getCanvasContainer,
        getScale,
        dropped,
      })

      onMounted(() => {
        window.addEventListener('mousemove', onMousemove)
        window.addEventListener('mouseup', onMouseup)
        window.addEventListener('mouseleave', onMouseleave)
        window.onblur = onblur
      })

      onBeforeUnmount(() => {
        window.removeEventListener('mousemove', onMousemove)
        window.removeEventListener('mouseup', onMouseup)
        window.removeEventListener('mouseleave', onMouseleave)
        window.onblur = onblur
      })

      return {
        prefixCls: useDesign('editor-component-panel'),
        componentSetting,
        query,
        isComponentVisible,
        onMousedown,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-editor-component-panel';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    user-select: none;

    .hide {
      opacity: 0;
    }

    :deep(.@{ant-prefix}-divider) {
      margin-bottom: 8px !important;
    }

    :deep(.@{ant-prefix}-card) {
      cursor: grab;

      &-cover {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;

        .@{namespace}-icon,
        .@{namespace}-svg-icon {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
