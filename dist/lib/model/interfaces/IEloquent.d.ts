/// <reference path="IModel.d.ts" />
/// <reference path="IModelQuery.d.ts" />
declare namespace NajsEloquent.Model {
    interface IEloquent<A> {
        new (): IModel<A> & IModelQuery<A> & A;
    }
}
