/// <reference path="IModel.d.ts" />
/// <reference path="IModelQuery.d.ts" />
declare namespace NajsEloquent.Model {
    interface IMongoose<T> extends IModelQuery<T> {
        new (): IModel<T> & IModelQuery<T>;
        Class<ChildType>(): IMongoose<ChildType & T>;
    }
}
