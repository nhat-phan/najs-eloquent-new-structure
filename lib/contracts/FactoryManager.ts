/// <reference path="../definitions/collect.js/index.d.ts" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/factory/IFactoryDefinition.ts" />

import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import IFactoryDefinition = NajsEloquent.Factory.IFactoryDefinition

namespace Najs.Contracts.Eloquent {
  export interface FactoryFunction {
    <T extends Model>(className: ModelDefinition<T>): Najs.Contracts.Eloquent.FactoryBuilder<T>
    <T extends Model>(className: ModelDefinition<T>, name: string): Najs.Contracts.Eloquent.FactoryBuilder<T>
    <T extends Model>(className: ModelDefinition<T>, amount: number): Najs.Contracts.Eloquent.FactoryBuilder<T>
    <T extends Model>(
      className: ModelDefinition<T>,
      name: string,
      amount: number
    ): Najs.Contracts.Eloquent.FactoryBuilder<T>
  }

  export interface FactoryManager {
    /**
     * Define a class with a given set of attributes.
     *
     * @param {string|Function} className
     * @param {Function} definition
     * @param {string} name
     */
    define(className: ModelDefinition, definition: IFactoryDefinition, name?: string): this

    /**
     * Define a class with a given short-name.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {Function} definition
     */
    defineAs(className: ModelDefinition, name: string, definition: IFactoryDefinition): this

    /**
     * Define a state with a given set of attributes.
     *
     * @param {string|Function} className
     * @param {string} state
     * @param {Function} definition
     */
    state(className: ModelDefinition, state: string, definition: IFactoryDefinition): this

    /**
     * Create a builder for the given model.
     *
     * @param {string|Function} className
     * @param {string} name
     */
    of<T>(className: ModelDefinition, name?: string): FactoryBuilder<T>

    /**
     * Create an instance of the given model and persist it to the database.
     *
     * @param {string|Function} className
     */
    create<T>(className: ModelDefinition): Promise<T>
    /**
     * Create an instance of the given model and persist it to the database.
     *
     * @param {string|Function} className
     * @param {Object} attributes
     */
    create<T>(className: ModelDefinition, attributes: object): Promise<T>
    /**
     * Create a collection of models and persist them to the database.
     *
     * @param {string|Function} className
     * @param {number} amount
     */
    create<T>(className: ModelDefinition, amount: number): Promise<CollectJs.Collection<T>>
    /**
     * Create a collection of models and persist them to the database.
     *
     * @param {string|Function} className
     * @param {number} amount
     * @param {Object} attributes
     */
    create<T>(className: ModelDefinition, amount: number, attributes: object): Promise<CollectJs.Collection<T>>

    /**
     * Create an instance of the given model and type and persist it to the database.
     *
     * @param {string|Function} className
     * @param {string} name
     */
    createAs<T>(className: ModelDefinition, name: string): Promise<T>
    /**
     * Create an instance of the given model and type and persist it to the database.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {Object} attributes
     */
    createAs<T>(className: ModelDefinition, name: string, attributes: object): Promise<T>
    /**
     * Create a collection of models and type and persist it to the database.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {number} amount
     */
    createAs<T>(className: ModelDefinition, name: string, amount: number): Promise<CollectJs.Collection<T>>
    /**
     * Create a collection of models and type and persist it to the database.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {number} amount
     * @param {Object} attributes
     */
    createAs<T>(
      className: ModelDefinition,
      name: string,
      amount: number,
      attributes: object
    ): Promise<CollectJs.Collection<T>>

    /**
     * Create an instance of the given model.
     *
     * @param {string|Function} className
     */
    make<T>(className: ModelDefinition): T
    /**
     * Create an instance of the given model.
     *
     * @param {string|Function} className
     * @param {Object} attributes
     */
    make<T>(className: ModelDefinition, attributes: object): T
    /**
     * Create a collection of models.
     *
     * @param {string|Function} className
     * @param {number} amount
     */
    make<T>(className: ModelDefinition, amount: number): CollectJs.Collection<T>
    /**
     * Create a collection of models.
     *
     * @param {string|Function} className
     * @param {number} amount
     * @param {Object} attributes
     */
    make<T>(className: ModelDefinition, amount: number, attributes: object): CollectJs.Collection<T>

    /**
     * Create an instance of the given model and type.
     *
     * @param {string|Function} className
     * @param {string} name
     */
    makeAs<T>(className: ModelDefinition, name: string): T
    /**
     * Create an instance of the given model and type.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {Object} attributes
     */
    makeAs<T>(className: ModelDefinition, name: string, attributes: object): T
    /**
     * Create a collection of models. and type.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {number} amount
     */
    makeAs<T>(className: ModelDefinition, name: string, amount: number): CollectJs.Collection<T>
    /**
     * Create a collection of models. and type.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {number} amount
     * @param {Object} attributes
     */
    makeAs<T>(className: ModelDefinition, name: string, amount: number, attributes: object): CollectJs.Collection<T>

    /**
     * Create the raw attribute array for a given model.
     *
     * @param {string|Function} className
     */
    raw<T>(className: ModelDefinition): T
    /**
     * Create the raw attribute array for a given model.
     *
     * @param {string|Function} className
     * @param {Object} attributes
     */
    raw<T>(className: ModelDefinition, attributes: object): T
    /**
     * Create an array of raw attribute arrays.
     *
     * @param {string|Function} className
     * @param {number} amount
     */
    raw<T>(className: ModelDefinition, amount: number): T[]
    /**
     * Create an array of raw attribute arrays.
     *
     * @param {string|Function} className
     * @param {number} amount
     * @param {Object} attributes
     */
    raw<T>(className: ModelDefinition, amount: number, attributes: object): T[]

    /**
     * Create the raw attribute array for a given named model.
     *
     * @param {string|Function} className
     * @param {string} name
     */
    rawOf<T>(className: ModelDefinition, name: string): T
    /**
     * Create the raw attribute array for a given named model.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {Object} attributes
     */
    rawOf<T>(className: ModelDefinition, name: string, attributes: object): T
    /**
     * Create an array of raw attribute arrays for a given named model.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {number} amount
     * @param {Object} attributes
     */
    rawOf<T>(className: ModelDefinition, name: string, amount: number): T[]
    /**
     * Create an array of raw attribute arrays for a given named model.
     *
     * @param {string|Function} className
     * @param {string} name
     * @param {number} amount
     * @param {Object} attributes
     */
    rawOf<T>(className: ModelDefinition, name: string, amount: number, attributes: object): T[]
  }
}
