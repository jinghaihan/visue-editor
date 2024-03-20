export interface EditorCollapsedConfig {
  sider: boolean
  siderWidth: number | string
  configSider: boolean
}

export interface EditorState {
  scale: number
  showGrid: boolean
  collapsed: EditorCollapsedConfig
}
