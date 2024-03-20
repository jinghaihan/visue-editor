<template>
  <div :class="prefixCls">
    <Component :is="componentType" :type="type" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import SvgIcon from './SvgIcon/index.vue'
  import { useDesign } from '@/hooks/useDesign'

  export default defineComponent({
    name: 'Icon',
    props: {
      type: {
        type: String,
        required: true,
      },
    },
    components: {
      SvgIcon,
    },
    setup(props) {
      return {
        prefixCls: useDesign('icon'),
        componentType: computed(() => {
          return props.type.startsWith('svg-') ? 'SvgIcon' : props.type
        }),
      }
    },
  })
</script>
