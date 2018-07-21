/// <reference path="../../contracts/Driver.ts" />
/// <reference path="../utils/IClassSetting.ts" />
/// <reference path="./IModelRecord.ts" />
/// <reference path="./IModelFillable.ts" />
/// <reference path="./IModelSerialization.ts" />
/// <reference path="./IModelTimestamps.ts" />
/// <reference path="./IModelSoftDeletes.ts" />

namespace NajsEloquent.Model {
  export type ModelDefinition<T = any> = string | { new (): IModel<T> }

  export declare class IModel<T = any> {
    /**
     * Contains metadata data which shared for all model instances
     */
    protected sharedMetadata: object

    /**
     * The driver associated with the model.
     */
    protected driver: Najs.Contracts.Eloquent.Driver<T>

    /**
     * The model's class setting
     */
    protected classSettings?: NajsEloquent.Util.IClassSetting

    /**
     * The model's attributes.
     */
    protected attributes: T
  }

  export interface IModel<T = any>
    extends IModelRecord<T>,
      IModelEvent,
      IModelFillable,
      IModelSerialization,
      IModelTimestamps,
      IModelSoftDeletes {
    /**
     * Get driver which is used by the model.
     */
    getDriver(): Najs.Contracts.Eloquent.Driver<T>

    /**
     * Get model name.
     */
    getModelName(): string
  }

  export type ModelInternal<T = any> = IModel<T> & {
    driver: Najs.Contracts.Eloquent.Driver<T>
    attributes: T
  }
}
