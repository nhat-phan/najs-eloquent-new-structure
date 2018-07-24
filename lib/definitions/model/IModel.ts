/// <reference path="../../contracts/Driver.ts" />
/// <reference path="../utils/IClassSetting.ts" />
/// <reference path="./IModelRecord.ts" />
/// <reference path="./IModelFillable.ts" />
/// <reference path="./IModelSerialization.ts" />
/// <reference path="./IModelTimestamps.ts" />
/// <reference path="./IModelSoftDeletes.ts" />

namespace NajsEloquent.Model {
  export type ModelDefinition = string | { new (): IModel }

  export declare class IModel {
    /**
     * Contains metadata data which shared for all model instances
     */
    protected sharedMetadata: object

    /**
     * The driver associated with the model.
     */
    protected driver: Najs.Contracts.Eloquent.Driver

    /**
     * The model's class setting
     */
    protected classSettings?: NajsEloquent.Util.IClassSetting

    /**
     * The model's attributes.
     */
    protected attributes: object
  }

  export interface IModel
    extends IModelRecord,
      IModelEvent,
      IModelFillable,
      IModelSerialization,
      IModelTimestamps,
      IModelSoftDeletes {
    /**
     * Get driver which is used by the model.
     */
    getDriver<T>(): Najs.Contracts.Eloquent.Driver<T>

    /**
     * Get model name.
     */
    getModelName(): string

    query(): NajsEloquent.QueryBuilder.IQueryBuilder<this>
  }

  export type ModelInternal<T = any> = IModel & {
    driver: Najs.Contracts.Eloquent.Driver<T>
    attributes: T
  }
}
