namespace NajsEloquent.Model {
  export interface IModelActiveRecord {
    delete(): Promise<boolean>

    save(): Promise<this>

    fresh(): Promise<this | null>
  }
}
