/// <reference path="../../contracts/Driver.d.ts" />
/// <reference path="../utils/IClassSetting.d.ts" />
/// <reference path="IModelRecord.d.ts" />
/// <reference path="IModelFillable.d.ts" />
/// <reference path="IModelSerialization.d.ts" />
/// <reference path="IModelTimestamps.d.ts" />
declare namespace NajsEloquent.Model {
    type ModelDefinition<T = any> = string | {
        new (): IModel<T>;
    };
    class IModel<T = any> {
        /**
         * Contains metadata data which shared for all model instances
         */
        protected sharedMetadata: object;
        /**
         * The model's class setting
         */
        protected classSettings: NajsEloquent.Util.IClassSetting;
        /**
         * The driver associated with the model.
         */
        protected driver: Najs.Contracts.Eloquent.Driver<T>;
        /**
         * The model's attributes.
         */
        protected attributes: T;
    }
    interface IModel<T = any> extends IModelRecord<T>, IModelFillable, IModelSerialization, IModelTimestamps {
        /**
         * Get driver which is used by the model.
         */
        getDriver(): Najs.Contracts.Eloquent.Driver<T>;
        /**
         * Get model name.
         */
        getModelName(): string;
    }
}
