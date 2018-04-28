/// <reference path="../IModel.ts" />
/// <reference path="../IModelQuery.ts" />

namespace NajsEloquent.Model.Static {
  export interface IMongooseStatic<T> extends IModelQuery<T> {
    new (): IModel<T> & IModelQuery<T>

    Class<ChildType>(): IMongooseStatic<ChildType & T>
  }
}
