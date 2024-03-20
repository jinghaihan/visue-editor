import type { VisueBasicConfig } from './Basic'
import type { PaperCellState } from '../components/Content/constant'
import { VisueBasic } from './Basic'
import { VisueCell } from './Cell'

export class VisuePaper extends VisueBasic {
  public cells: Record<string, VisueCell>

  constructor(config: VisueBasicConfig) {
    super(config)

    this.cells = {}
  }

  setCell(cell: VisueCell) {
    this.cells[cell.key] = cell
  }

  addCell(cell: PaperCellState) {
    const layout = this.instanceManager.get('Paper')?.layout
    if (layout) {
      layout.value.push(cell)
    }
  }

  removeCell(key: string) {
    delete this.cells[key]
  }

  triggerCellActive(key: string | string[]) {
    const data = typeof key === 'string' ? [key] : key
    const activeCells = this.instanceManager.get('Paper')?.activeCells
    activeCells.value = data
  }

  triggerCellDeactive(key?: string | string[]) {
    const activeCells = this.instanceManager.get('Paper')?.activeCells
    if (key) {
      const data = typeof key === 'string' ? [key] : key
      activeCells.value = activeCells.filter((key: string) => !data.includes(key))
    } else {
      activeCells.value = []
    }
  }

  getPaperCenter(width = 300, height = 300) {
    const state = this.instanceManager.get('Paper')?.paperState

    const originX = Math.floor(state.width / 2)
    const originY = Math.floor(state.height / 2)

    return {
      x: Math.floor(originX - width / 2),
      y: Math.floor(originY - height / 2),
    }
  }
}
