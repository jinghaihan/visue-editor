import { EventEmitter } from './EventEmitter'
import { InstanceManager } from './InstanceManager'

export interface VisueBasicConfig {
  key: string
  eventEmitter?: EventEmitter
  instanceManager?: InstanceManager
}

export class VisueBasic {
  public key: string
  public eventEmitter: EventEmitter
  public instanceManager: InstanceManager

  constructor(config: VisueBasicConfig) {
    this.key = config.key
    this.eventEmitter = config.eventEmitter || new EventEmitter()
    this.instanceManager = new InstanceManager()
  }
}
