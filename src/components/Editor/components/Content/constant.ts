export interface PaperPosState {
  x: number
  y: number
}

export interface MousePosState {
  mouseEvent: MouseEvent
  isInside: boolean
}

export interface PaperState {
  width: number
  height: number
  x: number
  y: number
  backgroundColor: string
  backgroundImage: string
  gridColor: string
  gridSize: number
  paperPos: PaperPosState | null
  mousePos: MousePosState | null
}

export interface DragPosState {
  x: number | null
  y: number | null
  startX: number | null
  startY: number | null
}

export interface PaperCellState {
  key: string
  w: number
  h: number
  x: number
  y: number
  rotation: number
  keepRatio: boolean
}
