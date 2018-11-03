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
         * Convert the model data to a plain object.
         *
         * Visible and hidden are applied.
         */
        attributesToObject<T extends object = object>(): T;
        /**
         * Convert the loaded relations to a plain object the name of relation in result is formatted like an attribute.
         *
         * Visible and hidden are applied.
         */
        relationsToObject<T extends object = object>(): T;
        /**
         * Convert the model given relations to a plain object the name of relation in result is formatted like an attribute.
         *
         * Visible and hidden are applied.
         */
        relationsToObject<T extends object = object>(...names: Array<string | string[]>): T;
        /**
         * Convert the model given relations to a plain object with option format name like attribute or not.
         *
         * Visible and hidden are applied.
         */
        relationsToObject<T extends object = object>(formatName: boolean, ...names: Array<string | string[]>): T;
        /**
         * Convert the model data and model relations to a plain object.
         *
         * Visible and hidden are applied.
         */
        toObject<T extends object = object>(): T;
        /**
         * Convert the model data and model given relations to a plain object.
         *
         * Visible and hidden are applied.
         */
        toObject<T extends object = object>(...relations: Array<string | string[]>): T;
        /**
         * Convert the model data and model given relations to a plain object with option format name like attribute or not.
         *
         * Visible and hidden are applied.
         */
        toObject<T extends object = object>(formatName: boolean, ...relations: Array<string | string[]>): T;
        /**
         * Convert the model instance to JSON string.
         */
        toJson(replacer?: (key: string, value: any) => any, space?: string | number): string;
    }
}
