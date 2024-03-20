<template>
  <AppProvider>
    <AppLayout />
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AppProvider from '@/components/Provider/AppProvider.vue'
  import AppLayout from '@/components/Layout/AppLayout.vue'

  export default defineComponent({
    name: 'App',
    components: { AppProvider, AppLayout },
    setup() {
      return {}
    },
  })
</script>
