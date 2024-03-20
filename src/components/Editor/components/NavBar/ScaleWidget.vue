<template>
  <div :class="prefixCls">
    <Action
      title="放大画布"
      icon="plus-outlined"
      @click="changeScale(HotKeysActionEnum.SCALE_UP)"
    />
    <div :class="`${prefixCls}-slider`">
      <a-slider
        :min="editor.setting.scale.min * 100"
        :max="editor.setting.scale.max * 100"
        :value="scale * 100"
        @change="onSliderChange"
      />
    </div>
    <Action
      title="缩小画布"
      icon="minus-outlined"
      @click="changeScale(HotKeysActionEnum.SCALE_DOWN)"
    />
    <Action
      title="重置画布尺寸"
      icon="sync-outlined"
      @click="changeScale(HotKeysActionEnum.SCALE_RESET)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import type { VisueEditor } from '../../lib/Editor'
  import { HotKeysActionEnum, HotKeysActionHandler } from '../../actions/Hotkeys'

  export default defineComponent({
    props: {
      scale: {
        type: Number,
        required: true,
      },
    },
    setup() {
      const editor = inject('Editor') as VisueEditor

      const changeScale = (event: number) => {
        HotKeysActionHandler(editor, event)
      }

      const onSliderChange = (value: number) => {
        const scale = Number((value / 100).toFixed(2))
        editor.setScale(scale)
      }

      return {
        prefixCls: useDesign('scale-widget'),
        editor,
        changeScale,
        onSliderChange,
        HotKeysActionEnum,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-scale-widget';

  .@{prefix-cls} {
    height: 100%;
    display: flex;
    align-items: center;

    &-slider {
      width: 120px;
      :deep(.@{ant-prefix}-slider-track) {
        background-color: @primary-color;
      }
      :deep(.@{ant-prefix}-slider-handle::after) {
        background-color: @primary-color;
        box-shadow: 0 0 0 2px @primary-color;
      }
    }
  }
</style>
