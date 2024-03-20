import type { Ref } from 'vue'
import { ref } from 'vue'
import { isBoolean, isNumber } from 'lodash-es'
import { projectSetting } from '@/settings/projectSetting'

import type { VueMoveable } from 'vue3-moveable'
import type { VisuePaper } from '../../lib/Paper'
import type { PaperState, PaperCellState } from './constant'
import { computed } from '@vue/reactivity'

const { prefixCls, primaryColor } = projectSetting

export interface useMoveableProps {
  paper: VisuePaper
  paperState: Ref<PaperState>
}

export const ViewableWidget = {
  name: 'ViewableWidget',
  props: [],
  events: [],
  render(moveable: VueMoveable, React: { createElement: (...args: any[]) => any }) {
    const rect = moveable.getRect()
    return React.createElement(
      'div',
      {
        key: 'ViewableWidget',
        className: 'moveable-ViewableWidget',
        style: {
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          background: primaryColor,
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: `translate(-50%, 0px)`,
        },
      },
      [
        '\n            ',
        Math.round(rect.offsetWidth),
        ' x ',
        Math.round(rect.offsetHeight),
        '\n        ',
      ],
    )
  },
}

export function useMoveable(props: useMoveableProps) {
  const layout: Ref<PaperCellState[]> = ref([])
  const activeCells: Ref<string[]> = ref([])
  const lockedCells: Ref<string[]> = ref([])
  const invisibleCells: Ref<string[]> = ref([])

  const directions = {
    left: true,
    top: true,
    right: true,
    bottom: true,
    center: true,
    middle: true,
  }

  const moveableConfig = computed(() => {
    return {
      origin: false,
      draggable: true,
      resizable: true,
      rotatable: true,
      snappable: true,
      keepRatio: !activeCells.value.length
        ? false
        : activeCells.value.length > 1
        ? true
        : getCell(activeCells.value[0])?.keepRatio,
      bounds: {
        left: 0,
        top: 0,
        right: props.paperState.value.width,
        bottom: props.paperState.value.height,
      },
      snapDirections: directions,
      elementSnapDirections: directions,
      elementGuidelines: layout.value
        .filter((cell) => !activeCells.value.includes(cell.key))
        .map((cell) => `#${prefixCls}-paper-cell-${cell.key}`),
      ables: [ViewableWidget],
      hideChildMoveableDefaultLines: true,
      props: {
        ViewableWidget: true,
      },
    }
  })

  function getCell(key: string): PaperCellState | undefined {
    return layout.value.find((cell) => cell.key === key)
  }

  const handleMoveable = (event: any) => {
    if (activeCells.value.length > 1) {
      event.events.forEach((e: any) => {
        const { target } = e

        const match = target.getAttribute('id').match(/cell-(.*)/)
        const cell = getCell(match ? match[1] : '')

        if (cell) {
          _update(e, cell)
        }
      })
    } else {
      const cell = getCell(activeCells.value[0])

      if (cell) {
        _update(event, cell)
      }
    }

    function _update(e: any, cell: PaperCellState) {
      updateState(e, cell)
      props.paper.cells[cell.key]?.resize()
    }
  }

  function updateState(
    { target, cssText }: { target: HTMLElement; cssText: string },
    cell: PaperCellState,
  ) {
    updateCellState(target, cssText, cell)
  }

  function updateCellState(target: HTMLElement, cssText: string, cell: PaperCellState) {
    if (!lockedCells.value.includes(cell.key)) {
      const attrs = parseCssText(cssText, cell)

      Object.keys(attrs).forEach((key) => {
        // @ts-ignore
        const value = attrs[key]
        if (value || isNumber(value) || isBoolean(value)) {
          // @ts-ignore
          cell[key] = value
        }
      })

      const style = calculateCellStyle(cell)
      if (style.width) {
        target.style.width = style.width
      }
      if (style.height) {
        target.style.height = style.height
      }
      if (style.transform) {
        target.style.transform = style.transform
      }
    }
  }

  function parseCssText(
    str: string,
    state: PaperCellState,
  ): Pick<PaperCellState, 'w' | 'h' | 'x' | 'y' | 'rotation'> {
    const widthRegex = /width: (-?\d*\.?\d+)px;/
    const heightRegex = /height: (-?\d*\.?\d+)px;/
    const translateRegex = /translate\((-?\d*\.?\d+)px, (-?\d*\.?\d+)px\)/
    const rotateRegex = /rotate\((-?\d*\.?\d+)deg\)/

    const widthMatch = widthRegex.exec(str)
    const heightMatch = heightRegex.exec(str)
    const translateMatch = translateRegex.exec(str)
    const rotateMatch = rotateRegex.exec(str)

    const style = {
      w: widthMatch ? parseInt(widthMatch[1]) : state.w,
      h: heightMatch ? parseInt(heightMatch[1]) : state.h,
      x: translateMatch ? parseInt(translateMatch[1]) : state.x,
      y: translateMatch ? parseInt(translateMatch[2]) : state.y,
      rotation: rotateMatch ? parseInt(rotateMatch[1]) : state.rotation,
    }

    return {
      ...style,
      x: style.x < 0 ? 0 : style.x,
      y: style.y < 0 ? 0 : style.y,
    }
  }

  function calculateCellStyle(cell: PaperCellState) {
    const { x, y, w, h, rotation } = cell

    return {
      width: w + 'px',
      height: h + 'px',
      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      zIndex: layout.value.findIndex((item) => item.key === cell.key),
      opacity: invisibleCells.value.includes(cell.key) ? 0 : 1,
    }
  }

  return {
    layout,
    activeCells,
    lockedCells,
    invisibleCells,
    moveableConfig,
    handleMoveable,
    calculateCellStyle,
  }
}
