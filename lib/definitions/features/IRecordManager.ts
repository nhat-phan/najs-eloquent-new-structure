/// <reference path="../model/IModel.ts" />

namespace NajsEloquent.Feature {
  export type DynamicAttributeSetting = {
    name: string
    getter: boolean
    setter: boolean
    accessor?: string
    mutator?: string
  }

  export interface IRecordManager<T> extends IFeature {
    /**
     * Initialize driver for a model.
     *
     * @param {Model} model
     * @param {boolean} isGuarded
     * @param {Record|object} data
     */
    initialize(model: Model.IModel, isGuarded: boolean, data?: T | object): this

    /**
     * Get the record's name, i.e
     *  - With MySQL it is a table's name
     *  - With Mongoose it is a collection's name
     *
     * @param {Model} model
     */
    getRecordName(model: Model.IModel): string

    /**
     * Get the native record instance.
     *
     * @param {Model} model
     */
    getRecord(model: Model.IModel): T

    /**
     * Format given attribute name
     *
     * @param {string} name
     */
    formatAttributeName(name: string): string

    /**
     * Get value for given key.
     *
     * @param {Model} model
     * @param {string} key
     */
    getAttribute(model: Model.IModel, key: string): any

    /**
     * Set value for given key.
     *
     * @param {Model} model
     * @param {string} key
     * @param {mixed} value
     */
    setAttribute<T>(model: Model.IModel, key: string, value: T): boolean

    /**
     * Get the primary key value.
     *
     * @param {Model} model
     */
    getPrimaryKey(model: Model.IModel): any

    /**
     * Set the primary key by given value.
     *
     * @param {Model} model
     * @param {mixed} value
     */
    setPrimaryKey<K>(model: Model.IModel, value: K): this

    /**
     * Get the primary key's name
     *
     * @param {Model} model
     */
    getPrimaryKeyName(model: Model.IModel): string

    /**
     * Determine give key is exists in Model or not.
     *
     * Note: if the given key is function name which exists in model it will returns true
     *
     * @param {Model} model
     * @param {string} key
     */
    hasAttribute(model: Model.IModel, key: string): boolean

    /**
     * Get list of known attributes, included Eloquent members and current class members
     */
    getKnownAttributes(model: Model.IModel): string[]

    /**
     * Get dynamic attributes (AKA accessors and mutators)
     */
    getDynamicAttributes(model: Model.IModel): DynamicAttributeSetting[]
  }
}