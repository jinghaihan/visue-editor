<template>
  <div :class="prefixCls">
    <Action
      v-for="action in actions"
      :key="action.key"
      :title="action.title"
      :icon="action.icon"
      @click="onClick(action)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import type { EditorNavActionConfig } from './constant'
  import { getActionBarSetting } from './constant'

  export default defineComponent({
    setup() {
      const actions = ref(
        getActionBarSetting().map((action) => {
          return {
            ...action,
            dispose: () => {
              actions.value = actions.value.filter((i) => i.key !== action.key)
            },
          }
        }),
      )

      const onClick = (action: EditorNavActionConfig) => {
        console.log('onClick', action)
      }

      return {
        prefixCls: useDesign('editor-action-bar'),
        actions,
        onClick,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-editor-action-bar';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
  }
</style>
