declare interface ProjectConfig {
  prefixCls: string
  primaryColor: string
}

declare interface EditorActionConfig {
  title: string
  key: string
  icon: string
  dispose?: () => void
}
