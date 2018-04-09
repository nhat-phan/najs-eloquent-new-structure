/// <reference path="interfaces/ISettingReader.ts" />

export class SettingType {
  static arrayUnique<T>(initializeValue: T[], defaultValue: T[]): NajsEloquent.Util.ISettingReader<T[]> {
    return function(staticValue?: T[], sampleValue?: T[], instanceValue?: T[]): T[] {
      if (!sampleValue && !sampleValue) {
        return defaultValue
      }

      const values: T[] = initializeValue
        .concat(staticValue ? staticValue : [])
        .concat(sampleValue ? sampleValue : [])
        .concat(instanceValue ? instanceValue : [])

      const result = Array.from(new Set(values))
      if (result.length === 0) {
        return defaultValue
      }
      return result
    }
  }
}
