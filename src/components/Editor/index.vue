<template>
  <a-layout :class="`${prefixCls} ${theme}`">
    <a-layout-header :class="`${prefixCls}-header`">
      <NavBar :editorState="editorState" />
    </a-layout-header>
    <a-divider />

    <a-layout :class="`${prefixCls}-layout-content`">
      <a-layout-sider
        v-model:collapsed="editorState.collapsed.sider"
        :class="`${prefixCls}-sider`"
        :theme="theme"
        :width="editorState.collapsed.siderWidth"
        :collapsible="true"
        :collapsedWidth="45"
      >
        <SideBar
          :changeCollapsed="
            (width: number | string) => {
              editorState.collapsed.sider = false
              editorState.collapsed.siderWidth = width
            }
          "
        />
      </a-layout-sider>

      <a-layout-content :class="`${prefixCls}-content`">
        <Paper
          v-if="activePaper"
          :key="activePaper"
          :editorState="editorState"
          :paper="Editor.papers[activePaper]"
        />
      </a-layout-content>

      <a-layout-sider
        v-model:collapsed="editorState.collapsed.configSider"
        :class="`${prefixCls}-config-sider`"
        :theme="theme"
        :width="300"
        :collapsible="true"
        :collapsedWidth="0"
        :reverseArrow="true"
      />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import type { Ref, ComponentInternalInstance } from 'vue'
  import { defineComponent, ref, toRefs, getCurrentInstance, provide, onMounted } from 'vue'
  import { useAppStore } from '@/store'
  import { useDesign } from '@/hooks/useDesign'

  import NavBar from './components/NavBar/index.vue'
  import SideBar from './components/SideBar/index.vue'
  import Paper from './components/Content/Paper.vue'

  import type { DvComponentGroupConfig } from './types'
  import { VisueEditor } from './lib/Editor'
  import type { EditorState } from './constant'
  import { getDvComponentSetting } from './components/DvComponents/constant'

  export default defineComponent({
    name: 'VisueEditor',
    components: { NavBar, SideBar, Paper },
    setup() {
      const appStore = useAppStore()
      const { theme } = toRefs(appStore)

      const editorState: Ref<EditorState> = ref({
        scale: 1,
        showGrid: true,
        collapsed: {
          sider: false,
          siderWidth: 245,
          configSider: false,
        },
      })

      const activePaper = ref('')
      const componentSetting: Ref<DvComponentGroupConfig[]> = ref([])

      const Editor = new VisueEditor()
      const instance = getCurrentInstance() as ComponentInternalInstance
      Editor.instanceManager.set('Editor', {
        model: instance,
        editorState,
        activePaper,
        componentSetting,
      })
      provide('Editor', Editor)
      onMounted(() => {
        Editor.addPaper()
        Editor.registerComponents(getDvComponentSetting())
      })

      return {
        prefixCls: useDesign(`editor`),
        theme,
        Editor,
        editorState,
        activePaper,
        componentSetting,
      }
    },
  })
</script>

<style lang="less" scoped>
  @import './theme.less';
  @prefix-cls: ~'@{namespace}-editor';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    position: relative;
    &-header {
      z-index: 110;
      height: 45px;
      padding: 0;
    }
    &-sider,
    &-config-sider {
      z-index: 110;
    }
    &-sider {
      :deep(.@{ant-prefix}-layout-sider-trigger) {
        height: 45px;
      }
    }
    &-content {
      position: relative;
    }
  }
</style>
