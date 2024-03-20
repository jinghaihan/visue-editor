export type EventMap = {
  [key: string]: Array<(...args: any[]) => void>
}

export class EventEmitter {
  private events: EventMap = {}

  on(event: string, listener: (...args: any[]) => void): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  off(event: string, listener: (...args: any[]) => void): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener)
    }
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this.events[event]
    if (listeners) {
      listeners.forEach((listener) => {
        listener(...args)
      })
    }
  }

  once(event: string, listener: (...args: any[]) => void): void {
    const onceListener = (...args: any[]) => {
      this.off(event, onceListener)
      listener(...args)
    }
    this.on(event, onceListener)
  }
}
