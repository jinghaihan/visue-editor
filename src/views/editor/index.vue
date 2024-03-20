<template>
  <VisueEditor />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import VisueEditor from '@/components/Editor/index.vue'

  export default defineComponent({
    name: 'Editor',
    components: { VisueEditor },
    setup() {
      return {}
    },
  })
</script>
