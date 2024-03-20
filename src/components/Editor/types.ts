export interface DvComponentConfigProps {
  key: string
  label: string
  type: string
  defaultValue?: string | number | boolean
  __props__: any
  __events__?: Record<string, (...args: any[]) => any>
}

export interface DvComponentConfig {
  title: string
  key: string
  image?: string
  width?: number
  height?: number
  __props__?: DvComponentConfigProps[]
}

export interface DvComponentGroupConfig {
  title: string
  key: string
  icon: string
  components: DvComponentConfig[]
}
