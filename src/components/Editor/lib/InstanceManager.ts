import type { ComponentInternalInstance, ComponentPublicInstance, Ref } from 'vue'

export interface instanceConfig<T = any> {
  model: ComponentInternalInstance
  [key: string]: T | Ref<any> | ((...args: any[]) => any) | ComponentInternalInstance
}

export class InstanceManager {
  private instances: Record<string, instanceConfig>

  constructor() {
    this.instances = {}
  }

  set(key: string, instance: instanceConfig): void {
    this.instances[key] = instance
  }

  get(key: string): instanceConfig | undefined {
    return this.instances[key]
  }

  getProxy(key: string): ComponentPublicInstance | null | undefined {
    return this.get(key)?.model.proxy
  }

  getRefs(key: string): Record<string, unknown> | undefined {
    return this.getProxy(key)?.$refs
  }
}
