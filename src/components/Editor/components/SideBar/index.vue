<template>
  <div :class="prefixCls">
    <ActionBar @action="onAction" />
    <a-divider type="vertical" :style="{ height: '100%' }" />
    <component :is="panelComponent" />
  </div>
</template>

<script lang="ts">
  import { capitalize } from 'lodash-es'
  import { defineComponent, defineAsyncComponent, ref } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import ActionBar from './ActionBar.vue'
  import type { EditorSiderActionConfig } from './constant'

  export default defineComponent({
    props: {
      changeCollapsed: {
        type: Function,
        required: true,
      },
    },
    components: {
      ActionBar,
      ComponentPanel: defineAsyncComponent(() => import('./Panel/ComponentPanel.vue')),
    },
    setup(props) {
      const panelComponent = ref('')

      const onAction = (action: EditorSiderActionConfig) => {
        props.changeCollapsed(action.width)
        panelComponent.value = capitalize(action.key) + 'Panel'
      }

      return {
        prefixCls: useDesign('editor-sider'),
        panelComponent,
        onAction,
      }
    },
  })
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-editor-sider';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
  }
</style>
