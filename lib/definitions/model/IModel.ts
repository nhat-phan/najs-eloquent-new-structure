/// <reference path="../../contracts/Driver.ts" />
/// <reference path="./IModelFillable.ts" />

namespace NajsEloquent.Model {
  export type ModelDefinition<T = any> = string | { new (): IModel<T> }

  export declare class IModel<T = any> {
    /**
     * The model's attributes.
     */
    protected attributes: T

    /**
     * The driver associated with the model.
     */
    protected driver: Najs.Contracts.Eloquent.Driver<T>
  }

  export interface IModel<T = any> extends IModelFillable {
    /**
     * Get driver which is used by the model.
     */
    getDriver(): Najs.Contracts.Eloquent.Driver<T>
  }
}
