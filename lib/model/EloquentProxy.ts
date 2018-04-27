export const EloquentProxy = {
  shouldProxy(target: any, key: any) {
    return typeof key !== 'symbol' && target.knownAttributes.indexOf(key) === -1
  },
  get(target: any, key: string) {
    if (this.shouldProxy(target, key)) {
      return target.driver.getAttribute(key)
    }
    return target[key]
  },
  set(target: any, key: string, value: any): boolean {
    if (this.shouldProxy(target, key)) {
      return target.driver.setAttribute(key, value)
    }
    target[key] = value
    return true
  }
}
