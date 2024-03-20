<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-top`">
      <Action
        v-for="action in actions"
        :key="action.key"
        :title="action.title"
        placement="right"
        :icon="action.icon"
        :active="activeKey === action.key"
        @click="onClick(action)"
      />
    </div>
    <div :class="`${prefixCls}-bottom`">
      <Action
        :title="theme === 'light' ? '暗色主题' : '亮色主题'"
        placement="right"
        :icon="theme === 'light' ? 'svg-moon' : 'svg-sun'"
        @click="changeTheme"
      />

      <Action
        title="紧凑模式"
        placement="right"
        icon="compress-outlined"
        @click="changeCompactMode"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, ref } from 'vue'
  import { useAppStore } from '@/store'
  import { useDesign } from '@/hooks/useDesign'
  import type { EditorSiderActionConfig } from './constant'
  import { getActionBarSetting } from './constant'

  export default defineComponent({
    emits: ['action'],
    setup(_, { emit }) {
      const appStore = useAppStore()
      const { theme } = toRefs(appStore)

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
      const activeKey = ref('')

      const onClick = (action: EditorSiderActionConfig) => {
        activeKey.value = action.key
        emit('action', action)
      }
      onClick(actions.value[0])

      return {
        prefixCls: useDesign('editor-action-bar'),
        theme,
        changeTheme: appStore.changeTheme,
        changeCompactMode: appStore.changeCompactMode,
        activeKey,
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
    width: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
