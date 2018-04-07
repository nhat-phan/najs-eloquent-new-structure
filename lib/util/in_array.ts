export function in_array<T>(key: T, ...args: T[][]): boolean {
  for (const array of args) {
    if (array.indexOf(key) !== -1) {
      return true
    }
  }
  return false
}
