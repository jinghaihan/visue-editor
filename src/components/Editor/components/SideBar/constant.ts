export interface EditorSiderActionConfig extends EditorActionConfig {
  width: number | string
}

export function getActionBarSetting(): EditorSiderActionConfig[] {
  return [
    { title: '组件', key: 'component', icon: 'appstore-outlined', width: 245 },
    { title: '图层', key: 'layer', icon: 'block-outlined', width: 245 },
    { title: '数据集', key: 'database', icon: 'database-outlined', width: '100%' },
    { title: '可视化集', key: 'visualSet', icon: 'node-index-outlined', width: '100%' },
    { title: '配置预览', key: 'config', icon: 'field-string-outlined', width: '100%' },
    { title: '剪贴板', key: 'clipboard', icon: 'copy-outlined', width: 245 },
  ]
}
