namespace Najs {
  namespace Database {
    export class IModelFillableMembers {
      protected fillable?: string[]
      protected guarded?: string[]
    }

    export interface IModelFillable extends IModelFillableMembers {
      getFillable(): string[]

      getGuarded(): string[]

      isFillable(key: string): boolean

      isGuarded(key: string): boolean
    }
  }
}
