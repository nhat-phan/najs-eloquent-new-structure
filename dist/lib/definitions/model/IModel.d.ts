/// <reference path="../../contracts/Driver.d.ts" />
/// <reference path="IModelFillable.d.ts" />
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
         * The model's attributes.
         */
        protected attributes: T;
        /**
         * The driver associated with the model.
         */
        protected driver: Najs.Contracts.Eloquent.Driver<T>;
    }
    interface IModel<T = any> extends IModelFillable {
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
