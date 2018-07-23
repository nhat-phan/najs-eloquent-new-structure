/// <reference path="../../contracts/Driver.d.ts" />
/// <reference path="../utils/IClassSetting.d.ts" />
/// <reference path="IModelRecord.d.ts" />
/// <reference path="IModelFillable.d.ts" />
/// <reference path="IModelSerialization.d.ts" />
/// <reference path="IModelTimestamps.d.ts" />
/// <reference path="IModelSoftDeletes.d.ts" />
declare namespace NajsEloquent.Model {
    type ModelDefinition = string | {
        new (): IModel;
    };
    class IModel {
        /**
         * Contains metadata data which shared for all model instances
         */
        protected sharedMetadata: object;
        /**
         * The driver associated with the model.
         */
        protected driver: Najs.Contracts.Eloquent.Driver;
        /**
         * The model's class setting
         */
        protected classSettings?: NajsEloquent.Util.IClassSetting;
        /**
         * The model's attributes.
         */
        protected attributes: object;
    }
    interface IModel extends IModelRecord, IModelEvent, IModelFillable, IModelSerialization, IModelTimestamps, IModelSoftDeletes {
        /**
         * Get driver which is used by the model.
         */
        getDriver<T>(): Najs.Contracts.Eloquent.Driver<T>;
        /**
         * Get model name.
         */
        getModelName(): string;
    }
    type ModelInternal<T = any> = IModel & {
        driver: Najs.Contracts.Eloquent.Driver<T>;
        attributes: T;
    };
}
