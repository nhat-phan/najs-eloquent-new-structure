/// <reference path="./IFeature.ts" />
/// <reference path="../model/IModel.ts" />

namespace NajsEloquent.Feature {
  export interface IFillableFeature extends IFeature {
    /**
     * Get the fillable attributes for the model.
     *
     * @param {Model} model
     */
    getFillable(model: Model.IModel): string[]

    /**
     * Add temporary fillable attributes for the model.
     *
     * @param {Model} model
     * @param {Array<string|string[]>} keys
     */
    addFillable(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): void

    /**
     * Determine if the given attribute may be mass assigned.
     *
     * @param {Model} model
     * @param {Array<string|string[]>} key
     */
    isFillable(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean

    /**
     * Get the guarded attributes for the model.
     *
     * @param {Model} model
     */
    getGuarded(model: Model.IModel): string[]

    /**
     * Add temporary guarded attributes for the model.
     *
     * @param {Model} model
     * @param {Array<string|string[]>} keys
     */
    addGuarded(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): void

    /**
     * Determine if the given key is guarded.
     *
     * @param {Model} model
     * @param {string} key
     */
    isGuarded(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean

    /**
     * Fill the model with an array of attributes.
     *
     * @param {Model} model
     * @param {Object} data
     */
    fill(model: Model.IModel, data: object): void

    /**
     * Fill the model with an array of attributes. Force mass assignment.
     *
     * @param {Model} model
     * @param {Object} data
     */
    forceFill(model: Model.IModel, data: object): void
  }
}
