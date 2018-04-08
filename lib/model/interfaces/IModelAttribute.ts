namespace NajsEloquent.Model {
  export interface IModelAttribute {
    getAttribute(name: string): any

    setAttribute(name: string): any
  }
}
