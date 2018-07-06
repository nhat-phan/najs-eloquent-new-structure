declare namespace NajsEloquent.Model {
    interface IModelRecord<T> {
        /**
         * Get the record's name, i.e
         *  - With MySQL it is a table's name
         *  - With Mongoose it is a collection's name
         */
        getRecordName(): string;
        /**
         * Get the native record instance.
         */
        getRecord(): T;
        /**
         * Format given attribute name
         *
         * @param {string} name
         */
        formatAttributeName(name: string): string;
        /**
         * Get value for given key.
         *
         * @param {Model} model
         * @param {string} key
         */
        getAttribute<K>(key: string): K;
        /**
         * Set value for given key.
         *
         * @param {string} key
         * @param {mixed} value
         */
        setAttribute<T>(key: string, value: T): this;
        /**
         * Determine give key is exists in Model or not.
         *
         * Note: if the given key is function name which exists in model it will returns true
         *
         * @param {string} key
         */
        hasAttribute(key: string): boolean;
        /**
         * Get the primary key value.
         *
         * @param {Model} model
         */
        getPrimaryKey<K>(): K;
        /**
         * Set the primary key by given value.
         *
         * @param {mixed} value
         */
        setPrimaryKey<K>(value: K): this;
        /**
         * Get the primary key's name
         */
        getPrimaryKeyName(): string;
        /**
         * Mark given attribute is modified.
         *
         * @param {string} name
         */
        markModified(...keys: Array<string | string[]>): this;
        /**
         * Determine the attribute is modified or not.
         */
        isModified(...keys: Array<string | string[]>): boolean;
        /**
         * Get modified fields name.
         */
        getModified(): string[];
    }
}
