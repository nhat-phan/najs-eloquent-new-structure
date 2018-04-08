/// <reference path="IModel.ts" />

namespace NajsEloquent.Model {
  export interface IModelQuery<T> {
    find(): Promise<IModel<T> & T>

    first(): Promise<IModel<T> & T>

    get(): Promise<IModel<T> & T>

    all(): Promise<IModel<T> & T>

    count(): Promise<number>

    pluck(): Object
  }
}
