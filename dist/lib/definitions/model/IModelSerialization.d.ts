declare namespace NajsEloquent.Model {
    class IModelSerialization {
        /**
         * The attributes that are visible when serialized.
         */
        protected visible?: string[];
        /**
         * The attributes that are hidden when serialized.
         */
        protected hidden?: string[];
    }
    interface IModelSerialization {
        /**
         * Get the visible attributes for the model.
         */
        getVisible(): string[];
        /**
         * Get the hidden attributes for the model.
         */
        getHidden(): string[];
        /**
         * Add temporary visible attributes for current instance.
         *
         * @param {string|string[]} keys
         */
        markVisible(...keys: Array<string | string[]>): this;
        /**
         * Add temporary hidden attributes for current instance.
         *
         * @param {string|string[]} keys
         */
        markHidden(...keys: Array<string | string[]>): this;
        /**
         * Determine if the given attribute may be included in JSON.
         *
         * @param {string} key
         */
        isVisible(...keys: Array<string | string[]>): boolean;
        /**
         * Determine if the given key hidden in JSON.
         *
         * @param {string} key
         */
        isHidden(...keys: Array<string | string[]>): boolean;
        /**
         * Convert the model instance to a plain object, visible and hidden are applied.
         */
        attributesToObject<T extends object = object>(): T;
        /**
         * Just an alias of .attributesToObject(), convert the model instance to a plain object,
         * visible and hidden are applied.
         */
        attributesToArray<T extends object = object>(): T;
        /**
         * Convert the model instance to a plain object, visible and hidden are not applied.
         */
        toObject<T extends object = object>(): T;
        /**
         * Convert the model instance to JSON string.
         */
        toJson(replacer?: (key: string, value: any) => any, space?: string | number): string;
    }
}
