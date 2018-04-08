namespace NajsEloquent.Model {
  export class IModelSerializationMembers {
    protected visible?: string[]
    protected hidden?: string[]
  }

  export interface IModelSerialization extends IModelSerializationMembers {
    getVisible(): string[]

    getHidden(): string[]

    isVisible(key: string): boolean

    isHidden(key: string): boolean

    toObject(): Object

    toJSON(): Object

    toJson(): Object
  }
}
