/// <reference path="../../contracts/Driver.ts" />
/// <reference path="IModelAttribute.ts" />
/// <reference path="IModelDynamicAttribute.ts" />
/// <reference path="IModelFillable.ts" />
/// <reference path="IModelSerialization.ts" />
/// <reference path="IModelQuery.ts" />
/// <reference path="IModelTimestamps.ts" />
/// <reference path="IModelSetting.ts" />

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
      IModelTimestamps {
    getClassName(): string

    newCollection(collection: any[]): any

    newInstance(data: Object | A): any
  }

  export type ModelMethod<T, R = T> = (this: IModel<any> & IModelSetting, ...args: any[]) => R
}
