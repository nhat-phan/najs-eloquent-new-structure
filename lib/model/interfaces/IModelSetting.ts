namespace NajsEloquent.Model {
  export interface IModelSetting {
    getArrayUniqueSetting(property: string, defaultValue: string[]): string[]
  }
}
