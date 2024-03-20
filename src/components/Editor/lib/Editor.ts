import { VisueBasic } from './Basic'
import { VisuePaper } from './Paper'

import type { DvComponentGroupConfig, DvComponentConfig } from '../types'
import { uuid } from '@/utils'

export interface VisueEditorScaleSetting {
  step: number
  min: number
  max: number
}

export interface VisueEditorSetting {
  scale: VisueEditorScaleSetting
}

export class VisueEditor extends VisueBasic {
  public papers: Record<string, VisuePaper>

  public setting: VisueEditorSetting

  constructor() {
    super({
      key: uuid(),
    })

    this.papers = {}

    this.setting = {
      scale: {
        step: 0.05,
        min: 0.1,
        max: 3.0,
      },
    }
  }

  addPaper(paperKey?: string) {
    const key = paperKey || uuid()

    this.papers[key] = new VisuePaper({
      key,
      eventEmitter: this.eventEmitter,
    })

    this.switchPaper(key)
  }

  removePaper(paperKey: string) {
    if (paperKey === this.getAcitvePaperState().value) {
      const keys = Object.keys(this.papers)
      this.switchPaper(keys.length ? keys[0] : '')
    }

    delete this.papers[paperKey]
  }

  switchPaper(paperKey: string) {
    this.getAcitvePaperState().value = paperKey
  }

  getAcitvePaperState() {
    return this.instanceManager.get('Editor')?.activePaper
  }

  getActivePaper() {
    return this.papers[this.getAcitvePaperState().value]
  }

  setScale(scale: number) {
    const state = this.instanceManager.get('Editor')?.editorState
    state.value.scale = scale
  }

  changeScale(direction: 'up' | 'down') {
    const state = this.instanceManager.get('Editor')?.editorState

    let scale = state.value.scale

    if (direction === 'up') scale += this.setting.scale.step
    else scale -= this.setting.scale.step

    if (scale < this.setting.scale.min) scale = this.setting.scale.min
    if (scale > this.setting.scale.max) scale = this.setting.scale.max

    if (state.value.scale !== scale) {
      this.setScale(scale)
    }
  }

  resetScale() {
    const paper = this.getActivePaper()
    const instance = paper.instanceManager.get('ScreenAdapter')
    instance?.calculateScale()
  }

  changeGridShow() {
    const state = this.instanceManager.get('Editor')?.editorState
    state.value.gridShow = !state.value.gridShow
  }

  registerComponent(groupKey: string, data: DvComponentConfig | DvComponentConfig[]): boolean {
    try {
      const components = Array.isArray(data) ? data : [data]

      const setting = this.instanceManager.get('Editor')?.componentSetting
      const index = setting.value.findIndex((i: DvComponentGroupConfig) => i.key === groupKey)
      if (!index) return false

      setting.value[index].components = [...setting.value[index].components, ...components]

      return true
    } catch (error) {
      return false
    }
  }

  registerComponents(data: DvComponentGroupConfig | DvComponentGroupConfig[]): boolean {
    try {
      const groups = Array.isArray(data) ? data : [data]

      const setting = this.instanceManager.get('Editor')?.componentSetting
      groups.forEach((group: DvComponentGroupConfig) => {
        const index = setting.value.findIndex((i: DvComponentGroupConfig) => i.key === group.key)
        if (index !== -1) {
          throw new Error()
        }
      })

      setting.value = setting.value.concat(groups)

      return true
    } catch (error) {
      return false
    }
  }
}
