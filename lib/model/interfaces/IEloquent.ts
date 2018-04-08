/// <reference path="IModel.ts" />
/// <reference path="IModelQuery.ts" />

namespace NajsEloquent.Model {
  export interface IEloquent<A> {
    new (): IModel<A> & IModelQuery<A> & A
  }
}
