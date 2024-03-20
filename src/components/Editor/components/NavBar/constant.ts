export type EditorNavActionConfig = EditorActionConfig

export function getActionBarSetting(): EditorActionConfig[] {
  return [
    { title: '保存', key: 'save', icon: 'save-outlined' },
    { title: '预览', key: 'eye', icon: 'eye-outlined' },
    { title: '锁定', key: 'lock', icon: 'lock-outlined' },
    { title: '导入配置', key: 'import', icon: 'import-outlined' },
    { title: '导出配置', key: 'export', icon: 'export-outlined' },
    { title: '截图', key: 'screenshot', icon: 'camera-outlined' },
  ]
}
