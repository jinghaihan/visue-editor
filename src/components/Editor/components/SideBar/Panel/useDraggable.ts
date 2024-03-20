import { uuid } from '@/utils'
import { parents } from '@/utils/dom'
import type { DvComponentConfig } from '../../../types'
import type { PaperCellState } from '../../Content/constant'

export interface useDraggableProps {
  getRelativeContainer: () => HTMLElement
  getDropContainer: () => HTMLElement
  getScale: () => number
  dropped: (el: PaperCellState) => void
}

export interface initialConfig {
  offsetX: number
  offsetY: number
  pageX: number
  pageY: number
  width: number
  dragSize: { w: number; h: number }
  flag: string
}

export function useDraggable(props: useDraggableProps) {
  let cloneEl: HTMLElement | null = null
  let currentMove: PaperCellState | null = null
  let initial: initialConfig | null = null
  let dragging = false
  const queue: any[] = []

  const onMousedown = (e: MouseEvent, element: DvComponentConfig) => {
    e.preventDefault()
    if (cloneEl) {
      return
    }

    const parentNodes = parents(e.target as HTMLElement, '.draggable-el')
    if (parentNodes && parentNodes.length) {
      const el = parentNodes[0].querySelector('.draggable-ghost') as HTMLElement
      if (!el) {
        return
      }

      currentMove = {
        key: uuid(),
        x: 0,
        y: 0,
        w: element.width || 300,
        h: element.height || 300,
        rotation: 0,
        keepRatio: false,
      }

      cloneEl = el.cloneNode(true) as HTMLElement
      cloneEl.style.position = 'absolute'
      cloneEl.style.zIndex = '1000'
      cloneEl.style.pointerEvents = 'none'
      const childEl = cloneEl.firstElementChild as HTMLElement
      childEl.style.height = '100%'
      childEl.style.width = '100%'

      initMove(
        e,
        { width: el.offsetWidth },
        { w: currentMove.w, h: currentMove.h },
        currentMove.key,
      )

      const container = props.getRelativeContainer()
      container.appendChild(cloneEl)
      dragging = true
      el.classList.add('hide')
      queue.push(() => {
        el.classList.remove('hide')
      })
    }
  }

  const onMousemove = (e: MouseEvent) => {
    if (initial && dragging && cloneEl) {
      moveFlutter(e.pageX - initial.offsetX, e.pageY - initial.offsetY, distance(e))
    }
  }

  const onMouseup = (e: MouseEvent) => {
    const container = props.getDropContainer()

    const lostX = e.x - container.getBoundingClientRect().left
    const lostY = e.y - container.getBoundingClientRect().top

    done(lostX, lostY)
  }

  const onMouseleave = () => {
    end()
  }

  const onblur = () => {
    end()
  }

  const initMove = (
    {
      offsetX,
      offsetY,
      pageX,
      pageY,
    }: { offsetX: number; offsetY: number; pageX: number; pageY: number },
    { width }: { width: number },
    dragSize: { w: number; h: number },
    flag: string,
  ) => {
    initial = { offsetX, offsetY, pageX, pageY, width, dragSize, flag }
    moveFlutter(pageX - offsetX, pageY - offsetY)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const moveFlutter = (x: number, y: number, d = 0) => {
    if (initial) {
      const options = [
        `left: ${x}px`,
        `top: ${y}px`,
        `width: ${initial.dragSize.w * props.getScale()}px`,
        `height: ${initial.dragSize.h * props.getScale()}px`,
      ]
      updateStyle(options)
    }
  }

  const updateStyle = (arr: ConcatArray<string>) => {
    if (cloneEl) {
      const original = cloneEl.style.cssText.split(';')
      original.pop()
      cloneEl.style.cssText = original.concat(arr).join(';') + ';'
    }
  }

  const distance = ({ pageX, pageY }: { pageX: number; pageY: number }) => {
    if (initial) {
      const { pageX: x, pageY: y } = initial
      const b = pageX - x
      const a = pageY - y

      return Math.hypot(b, a)
    }
  }

  const end = () => {
    dragging = false
    if (!initial || !cloneEl) {
      return
    }

    cloneEl.style.transition = 'all 0.3s'
    updateStyle([
      `left: ${initial.pageX - initial.offsetX}px`,
      `top: ${initial.pageY - initial.offsetY}px`,
      'transform: scale(1)',
    ])

    setTimeout(() => {
      queue.length && queue.shift()()
      cloneEl && cloneEl.remove()
      cloneEl = null
    }, 300)
  }

  const done = (x: number, y: number) => {
    if (!initial || !cloneEl || !currentMove) {
      return
    }

    const scale = props.getScale()
    currentMove.x = parseInt(((x - initial.offsetX) / scale).toString())
    currentMove.y = parseInt(((y - initial.offsetY) / scale).toString())

    props.dropped({ ...currentMove })
    currentMove = null

    end()
  }

  return {
    onMousedown,
    onMousemove,
    onMouseup,
    onMouseleave,
    onblur,
  }
}
