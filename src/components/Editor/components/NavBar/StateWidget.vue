<template>
  <div :class="prefixCls">
    <Action
      v-for="action in ['undo', 'redo']"
      :key="action"
      :title="action === 'undo' ? '撤销' : '回退'"
      :icon="`svg-${action}`"
      @click="changeState(action)"
    />
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

      const changeState = (action: string) => {
        const key = action.toUpperCase() as keyof typeof HotKeysActionEnum
        HotKeysActionHandler(editor, HotKeysActionEnum[key])
      }

      return {
        prefixCls: useDesign('state-widget'),
        changeState,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-state-widget';

  .@{prefix-cls} {
    height: 100%;
    display: flex;
    align-items: center;

    :deep(.@{namespace}-icon) {
      font-size: 18px;
    }
  }
</style>
