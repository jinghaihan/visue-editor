import { inject } from 'vue'

export function useDesign(scope: string) {
  return `${inject('prefixCls')}-${scope}`
}
