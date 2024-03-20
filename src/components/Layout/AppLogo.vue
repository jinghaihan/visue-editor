<template>
  <div :class="prefixCls">
    <Icon class="logo" type="svg-logo" />
    <div :class="`${prefixCls}-title`"> VISUE-EDITOR </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  export default defineComponent({
    name: 'AppLogo',
    setup() {
      return {
        prefixCls: useDesign('app-logo'),
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    height: 100%;
    display: flex;
    column-gap: 8px;
    .logo {
      height: 100%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      color: @cyan-color;
    }
    .@{prefix-cls}-title {
      width: 200px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
    }
  }
</style>
