/// <reference path="../IModel.d.ts" />
/// <reference path="../IModelQuery.d.ts" />
declare namespace NajsEloquent.Model.Static {
    interface IMongooseStatic<T> extends IModelQuery<T> {
        new (): IModel<T> & IModelQuery<T>;
        Class<ChildType>(): IMongooseStatic<ChildType & T>;
    }
}
