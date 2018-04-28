/// <reference path="./IModel.ts" />
/// <reference path="./IModelQuery.ts" />

namespace NajsEloquent.Model {
  export interface IMongoose<T> extends IModelQuery<T> {
    new (): IModel<T> & IModelQuery<T>

    Class<ChildType>(): IMongoose<ChildType & T>
  }
}
