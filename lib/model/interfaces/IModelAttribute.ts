namespace NajsEloquent.Model {
  export interface IModelAttribute {
    /**
     * Determine give key is exists in Model or not.
     *
     * Note: if the given key is function name which exists in model it will returns true
     *
     * @param {string} key
     */
    hasAttribute(key: string): boolean

    /**
     * Get value for given key.
     *
     * @param {string} key
     */
    getAttribute(key: string): any

    /**
     * Set value for given key.
     *
     * @param {string} key
     * @param {mixed} value
     */
    setAttribute<T>(key: string, value: T): this

    /**
     * Get the primary key value.
     */
    getPrimaryKey(): any

    /**
     * Set the primary key by given value.
     *
     * @param {mixed} value
     */
    setPrimaryKey<T>(value: any): this

    /**
     * Get the primary key's name
     */
    getPrimaryKeyName(): string
  }
}
