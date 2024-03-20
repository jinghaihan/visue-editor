<template>
  <svg :class="prefixCls" aria-hidden="true">
    <use :xlink:href="`#${type}`" />
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      type: {
        type: String,
        required: true,
      },
    },
    setup() {
      return {
        prefixCls: useDesign('svg-icon'),
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-svg-icon';

  .@{prefix-cls} {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
