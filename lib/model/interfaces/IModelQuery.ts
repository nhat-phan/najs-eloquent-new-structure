/// <reference path="IModel.ts" />

namespace NajsEloquent.Model {
  export interface IModelQuery<A> {
    first(): IModel<A> & A
  }
}
