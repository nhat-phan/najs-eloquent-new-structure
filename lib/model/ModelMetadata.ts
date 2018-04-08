/// <reference path="interfaces/IModel.ts" />
/// <reference path="interfaces/IEloquent.ts" />

import { make } from 'najs-binding'

export class ModelMetadata {
  protected model: NajsEloquent.Model.IModel<any>
  protected definition: NajsEloquent.Model.IEloquent<any>

  private constructor(model: NajsEloquent.Model.IModel<any>) {
    this.model = model
    this.definition = Object.getPrototypeOf(model).constructor
  }

  getSetting<T>(property: string, merger: (staticVersion?: T, memberVersion?: T) => T): T {
    return merger(
      this.definition[property] ? this.definition[property] : undefined,
      this.model[property] ? this.model[property] : undefined
    )
  }

  static arrayUnique<T>(staticVersion?: T[], memberVersion?: T[]): T[] {
    let result: T[] = []
    if (staticVersion) {
      result = result.concat(staticVersion)
    }
    if (memberVersion) {
      result = result.concat(memberVersion)
    }
    return Array.from(new Set(result))
  }

  /**
   * store ModelMetadata instance with "sample" model
   */
  protected static cached: Object = {}

  /**
   * get metadata of Model class
   */
  static get(model: NajsEloquent.Model.IModel<any>): ModelMetadata
  static get(model: NajsEloquent.Model.IModel<any>, cache: boolean): ModelMetadata
  static get(model: NajsEloquent.Model.IModel<any>, cache: boolean = true): ModelMetadata {
    const className = model.getClassName()
    if (!this.cached[className] || !cache) {
      this.cached[className] = new ModelMetadata(make(className, ['do-not-initialize']))
    }
    return this.cached[className]
  }
}
