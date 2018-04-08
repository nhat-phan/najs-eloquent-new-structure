namespace NajsEloquent.Model {
  export interface IModelAttribute<RecordType> {
    id?: any

    getAttribute(name: string): any

    setAttribute(name: string): void

    getPrimaryKey(): any

    setPrimaryKey(id: any): void

    getPrimaryKeyName(): string
  }
}
