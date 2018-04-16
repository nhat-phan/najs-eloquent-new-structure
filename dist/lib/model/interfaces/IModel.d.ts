/// <reference path="../../contracts/Driver.d.ts" />
/// <reference path="IModelFillable.d.ts" />
declare namespace NajsEloquent.Model {
    class IModelMembers<A> {
        /**
         * The model's attributes.
         */
        protected attributes: A;
        /**
         * The driver associated with the model.
         */
        protected driver: Najs.Contracts.Eloquent.Driver<A>;
    }
    interface IModel<A> extends IModelMembers<A>, IModelAttribute, IModelFillable, IModelSerialization {
        getClassName(): string;
    }
    class IModel<A> {
    }
}
