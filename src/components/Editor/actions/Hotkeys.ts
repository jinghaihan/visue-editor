import type { VisueEditor } from '../lib/Editor'

export enum HotKeysActionEnum {
  UNDO,
  REDO,
  COPY,
  PASTE,
  DELETE,
  LOCK,
  GRID_SHOW,
  MULTI_SELECT,
  SCALE_UP,
  SCALE_DOWN,
  SCALE_RESET,
  ELEMENT_VISIBLE,
  CLEAR,
  SCREENSHOT,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HotKeysActionHandler(editor: VisueEditor, event: number, argument?: any) {
  const paper = editor.getActivePaper()
  if (!paper) return

  switch (event) {
    case HotKeysActionEnum.UNDO:
      break
    case HotKeysActionEnum.REDO:
      break
    case HotKeysActionEnum.COPY:
      break
    case HotKeysActionEnum.PASTE:
      break
    case HotKeysActionEnum.DELETE:
      break
    case HotKeysActionEnum.LOCK:
      break
    case HotKeysActionEnum.GRID_SHOW:
      break
    case HotKeysActionEnum.MULTI_SELECT:
      break
    case HotKeysActionEnum.SCALE_UP:
      editor.changeScale('up')
      break
    case HotKeysActionEnum.SCALE_DOWN:
      editor.changeScale('down')
      break
    case HotKeysActionEnum.SCALE_RESET:
      editor.resetScale()
      break
    case HotKeysActionEnum.ELEMENT_VISIBLE:
      break
    case HotKeysActionEnum.CLEAR:
      break
    case HotKeysActionEnum.SCREENSHOT:
      break
  }
}
