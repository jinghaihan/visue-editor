export class WebStorage {
  public storage: Storage

  constructor(type: 'local' | 'session') {
    this.storage = type === 'local' ? localStorage : sessionStorage
  }

  set(key: string, value: any) {
    this.storage.setItem(
      key,
      JSON.stringify({
        expire: null,
        value,
      }),
    )
  }

  get(key: string) {
    const str = this.storage.getItem(key) as string
    try {
      return JSON.parse(str).value
    } catch (error) {
      return null
    }
  }
}

export const webStorage = {
  ls: new WebStorage('local'),
  ss: new WebStorage('session'),
}
