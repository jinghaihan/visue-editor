<template>
  <div :class="prefixCls">
    <Action title="清空画布" icon="delete-filled" @click="clearPaper()" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import type { VisueEditor } from '../../lib/Editor'
  import { HotKeysActionEnum, HotKeysActionHandler } from '../../actions/Hotkeys'

  export default defineComponent({
    setup() {
      const editor = inject('Editor') as VisueEditor

      const clearPaper = () => {
        HotKeysActionHandler(editor, HotKeysActionEnum.CLEAR)
      }

      return {
        prefixCls: useDesign('clear-widget'),
        clearPaper,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-clear-widget';

  .@{prefix-cls} {
    height: 100%;
    display: flex;
    align-items: center;

    :deep(.@{namespace}-icon) {
      color: @red-color;
    }
  }
</style>
