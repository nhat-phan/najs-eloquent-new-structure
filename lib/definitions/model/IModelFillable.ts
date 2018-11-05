namespace NajsEloquent.Model {
  export declare class IModelFillable {
    /**
     * The attributes that are mass assignable.
     */
    protected fillable?: string[]

    /**
     * The attributes that aren't mass assignable.
     */
    protected guarded?: string[]
  }

  export interface IModelFillable {
    /**
     * Get the fillable attributes for the model.
     */
    getFillable(): string[]

    /**
     * Add temporary fillable attributes for the model.
     *
     * @param {string|string[]} keys
     */
    addFillable(...keys: Array<string | string[]>): this

    /**
     * Determine if the given attribute may be mass assigned.
     *
     * @param {string} key
     */
    isFillable(...keys: Array<string | string[]>): boolean

    /**
     * Get the guarded attributes for the model.
     */
    getGuarded(): string[]

    /**
     * Add temporary guarded attributes for the model.
     *
     * @param {string|string[]} keys
     */
    addGuarded(...keys: Array<string | string[]>): this

    /**
     * Determine if the given key is guarded.
     *
     * @param {string} key
     */
    isGuarded(...keys: Array<string | string[]>): boolean

    /**
     * Fill the model with an array of attributes.
     *
     * @param {Object} data
     */
    fill(data: object): this

    /**
     * Fill the model with an array of attributes. Force mass assignment.
     *
     * @param {Object} data
     */
    forceFill(data: object): this
  }
}
