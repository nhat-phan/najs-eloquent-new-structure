/// <reference path="interfaces/IModel.ts" />
/// <reference path="interfaces/IModelQuery.ts" />

export interface IEloquent<A> {
  new (): NajsEloquent.Model.IModel<A> & NajsEloquent.Model.IModelQuery<A> & A
}

export const Model: IEloquent<any> = <any>function<A>() {
  return {}
}
