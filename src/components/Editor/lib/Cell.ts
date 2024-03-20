import type { VisueBasicConfig } from './Basic'
import { VisueBasic } from './Basic'

export class VisueCell extends VisueBasic {
  constructor(config: VisueBasicConfig) {
    super(config)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resize() {}
}
