<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-left`">
      <AppLogo />
    </div>

    <div :class="`${prefixCls}-center`">
      <StateWidget />
      <ScaleWidget :scale="editorState.scale" />
      <ClearWidget />
    </div>

    <div :class="`${prefixCls}-right`">
      <ActionBar />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  import AppLogo from '@/components/Layout/AppLogo.vue'
  import StateWidget from './StateWidget.vue'
  import ScaleWidget from './ScaleWidget.vue'
  import ClearWidget from './ClearWidget.vue'
  import ActionBar from './ActionBar.vue'

  export default defineComponent({
    props: {
      editorState: {
        type: Object,
        required: true,
      },
    },
    components: { AppLogo, StateWidget, ScaleWidget, ClearWidget, ActionBar },
    setup() {
      return {
        prefixCls: useDesign('editor-nav'),
      }
    },
  })
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-editor-nav';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      height: 100%;
      display: flex;
      align-items: center;
    }
    &-left {
      width: 245px;
    }
    &-right {
      width: 300px;
    }
  }
</style>
