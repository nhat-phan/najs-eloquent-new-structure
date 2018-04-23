/// <reference path="../../contracts/Driver.d.ts" />
/// <reference path="IModelAttribute.d.ts" />
/// <reference path="IModelDynamicAttribute.d.ts" />
/// <reference path="IModelFillable.d.ts" />
/// <reference path="IModelSerialization.d.ts" />
/// <reference path="IModelQuery.d.ts" />
/// <reference path="IModelTimestamps.d.ts" />
/// <reference path="IModelSetting.d.ts" />
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
        /**
         * The settings associated with the model
         */
        protected settings: Object;
    }
    interface IModel<A> extends IModelAttribute, IModelDynamicAttribute, IModelFillable, IModelSerialization, IModelTimestamps {
        getClassName(): string;
        newCollection(collection: any[]): any;
        newInstance(data: Object | A): any;
    }
    type ModelMethod<T, R = T> = (this: IModel<any> & IModelSetting, ...args: any[]) => R;
}
