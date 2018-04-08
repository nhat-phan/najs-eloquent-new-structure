/// <reference path="IModelFillable.d.ts" />
declare namespace NajsEloquent.Model {
    class IModelMembers<A> {
        protected attributes: A;
    }
    interface IModel<A> extends IModelMembers<A>, IModelFillable {
        getClassName(): string;
    }
}
