/// <reference path="../../contracts/Driver.d.ts" />
/// <reference path="IModelAttribute.d.ts" />
/// <reference path="IModelDynamicAttribute.d.ts" />
/// <reference path="IModelFillable.d.ts" />
/// <reference path="IModelSerialization.d.ts" />
/// <reference path="IModelQuery.d.ts" />
declare namespace NajsEloquent.Model {
    class IModel<A> {
        /**
         * The model's attributes.
         */
        protected attributes: A;
        /**
         * The driver associated with the model.
         */
        protected driver: Najs.Contracts.Eloquent.Driver<A>;
    }
    interface IModel<A> extends IModelAttribute, IModelDynamicAttribute, IModelFillable, IModelSerialization {
        getClassName(): string;
        newCollection(collection: any[]): any;
        newInstance(data: Object | A): any;
    }
}
