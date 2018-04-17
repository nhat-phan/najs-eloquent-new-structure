declare namespace NajsEloquent.Model {
    interface IModelAttribute {
        /**
         * Get value for given key.
         *
         * @param {string} key
         */
        getAttribute(key: string): any;
        /**
         * Set value for given key.
         *
         * @param {string} key
         * @param {mixed} value
         */
        setAttribute<T>(key: string, value: T): this;
        /**
         * Get the primary key value.
         */
        getPrimaryKey(): any;
        /**
         * Set the primary key by given value.
         *
         * @param {mixed} value
         */
        setPrimaryKey<T>(value: T): this;
        /**
         * Get the primary key's name
         */
        getPrimaryKeyName(): string;
    }
}
