<template>
  <a-config-provider
    :locale="locale"
    :prefixCls="prefixCls"
    :theme="{
      token: { colorPrimary: primaryColor },
      algorithm,
    }"
  >
    <slot></slot>
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent, toRefs, computed } from 'vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { theme as themeAlgorithm } from 'ant-design-vue'
  import { useAppStore } from '@/store'
  import { projectSetting } from '@/settings/projectSetting'

  export default defineComponent({
    name: 'AppProvider',
    provide() {
      return {
        prefixCls: projectSetting.prefixCls,
      }
    },
    setup() {
      const appStore = useAppStore()
      const { theme, compact } = toRefs(appStore)

      return {
        locale: zhCN,
        prefixCls: projectSetting.prefixCls,
        primaryColor: projectSetting.primaryColor,
        algorithm: computed(() => {
          const algorithm = [
            theme.value === 'light'
              ? themeAlgorithm.defaultAlgorithm
              : themeAlgorithm.darkAlgorithm,
          ]
          if (compact.value) {
            algorithm.push(themeAlgorithm.compactAlgorithm)
          }

          return algorithm
        }),
      }
    },
  })</script
>@/settings/projectSetting
