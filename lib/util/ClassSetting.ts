import { IAutoload, make } from 'najs-binding'

export const CREATE_SAMPLE = 'create-sample'

export class ClassSetting {
  protected model: Object
  protected definition: Function

  private constructor(model: Object) {
    this.model = model
    this.definition = Object.getPrototypeOf(model).constructor
  }

  read<T>(property: string, merger: (staticVersion?: T, memberVersion?: T) => T): T {
    return merger(
      this.definition[property] ? this.definition[property] : undefined,
      this.model[property] ? this.model[property] : undefined
    )
  }

  static arrayUnique<T>(initializeValue: T[], defaultValue: T[]): any {
    return function(staticVersion?: T[], memberVersion?: T[]): T[] {
      if (!staticVersion && !memberVersion) {
        return defaultValue
      }

      const values: T[] = initializeValue
        .concat(staticVersion ? staticVersion : [])
        .concat(memberVersion ? memberVersion : [])

      const result = Array.from(new Set(values))
      if (result.length === 0) {
        return defaultValue
      }
      return result
    }
  }

  /**
   * store ModelMetadata instance with "sample" model
   */
  protected static samples: Object = {}

  /**
   * get metadata of Model class
   */
  static of(model: IAutoload): ClassSetting
  static of(model: IAutoload, cache: boolean): ClassSetting
  static of(model: IAutoload, cache: boolean = true): ClassSetting {
    const className = model.getClassName()
    if (!this.samples[className] || !cache) {
      this.samples[className] = new ClassSetting(make(className, [CREATE_SAMPLE]))
    }
    return this.samples[className]
  }
}

ClassSetting.of(<any>{}).read('fillable', ClassSetting.arrayUnique([], []))
