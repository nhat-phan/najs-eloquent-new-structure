/// <reference path="./IFeature.ts" />
/// <reference path="../model/IModel.ts" />

namespace NajsEloquent.Feature {
  export interface ISerializationFeature extends IFeature {
    /**
     * Get the visible attributes for the model.
     */
    getVisible(model: Model.IModel): string[]

    /**
     * Get the hidden attributes for the model.
     */
    getHidden(model: Model.IModel): string[]

    /**
     * Add temporary visible attributes for current instance.
     *
     * @param {string|string[]} keys
     */
    markVisible(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): void

    /**
     * Add temporary hidden attributes for current instance.
     *
     * @param {string|string[]} keys
     */
    markHidden(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): void

    /**
     * Determine if the given attribute may be included in JSON.
     *
     * @param {string} key
     */
    isVisible(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean

    /**
     * Determine if the given key hidden in JSON.
     *
     * @param {string} key
     */
    isHidden(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean

    /**
     * Convert the model instance to a plain object, visible and hidden are not applied.
     */
    toObject(model: Model.IModel): object

    /**
     * Convert the model instance to JSON object.
     */
    toJson(model: Model.IModel): object
  }
}