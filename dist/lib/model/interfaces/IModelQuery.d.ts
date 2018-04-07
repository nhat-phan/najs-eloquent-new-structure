/// <reference path="IModel.d.ts" />
declare namespace NajsEloquent.Model {
    interface IModelQuery<A> {
        first(): IModel<A> & A;
    }
}
