/// <reference path="Driver.ts" />

namespace Najs.Contracts.Eloquent {
  export interface Component extends Najs.Contracts.Autoload {
    /**
     * The model instance
     */
    model: any

    /**
     * Driver instance of the model
     */
    driver: Driver<any>

    /**
     * Create an Component instance which wrap the model and driver
     */
    constructor(model: any, driver: any): void

    /**
     * Determine given key is a getter
     */
    isGetter(key: string | symbol, model: any): boolean

    /**
     * proxify a getter for the model
     *
     * @param {Object} model
     * @param {string} key
     */
    proxifyGetter(model: any, key: string | symbol): any

    /**
     * Determine given key is a setter
     *
     * @param {string} key
     * @param {mixed} value
     * @param {Object} model
     */
    isSetter(key: string | symbol, value: any, model: any): boolean

    /**
     * proxify a setter for the model
     *
     * @param {string} key
     * @param {mixed} value
     * @param {Object} model
     */
    proxifySetter(model: any, key: string | symbol, value: any): boolean
  }
}
