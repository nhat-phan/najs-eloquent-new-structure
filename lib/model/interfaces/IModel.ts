/// <reference path="../../contracts/Driver.ts" />
/// <reference path="IModelSetting.ts" />
/// <reference path="IModelAttribute.ts" />
/// <reference path="IModelFillable.ts" />
/// <reference path="IModelSerialization.ts" />
/// <reference path="IModelActiveRecord.ts" />
/// <reference path="IModelQuery.ts" />
/// <reference path="IModelTimestamps.ts" />
/// <reference path="IModelDynamicAttribute.ts" />

namespace NajsEloquent.Model {
  export class IModel<A> {
    /**
     * The model's attributes.
     */
    protected attributes: A

    /**
     * The driver associated with the model.
     */
    protected driver: Najs.Contracts.Eloquent.Driver<A>

    /**
     * The settings associated with the model
     */
    protected settings: Object
  }

  export interface IModel<A>
    extends IModelAttribute,
      IModelDynamicAttribute,
      IModelFillable,
      IModelSerialization,
      IModelActiveRecord,
      IModelTimestamps,
      IModelSoftDeletes {
    /**
     * Get class name of the model.
     */
    getClassName(): string

    /**
     * Get model name of the model, returns .getClassName() by default.
     */
    getModelName(): string

    /**
     * Create new Collection from an array of raw attributes.
     *
     * @param {Array<Object>} list
     */
    newCollection(list: any[]): any

    /**
     * Create new instance from raw attributes.
     *
     * @param {Object} data
     */
    newInstance(data: Object | A): any
  }

  export type ModelMethod<T, R = T> = (this: IModel<any> & IModelSetting & IModelQuery<any, any>, ...args: any[]) => R
}
