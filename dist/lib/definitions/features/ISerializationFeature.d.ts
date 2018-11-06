/// <reference path="IFeature.d.ts" />
/// <reference path="../model/IModel.d.ts" />
declare namespace NajsEloquent.Feature {
    interface ISerializationFeature extends IFeature {
        /**
         * Get the visible attributes for the model.
         *
         * @param {Model} model
         */
        getVisible(model: Model.IModel): string[];
        /**
         * Set visible attributes for the model. Warning: this function reset all visible setting included static.
         *
         * @param {Model} model
         */
        setVisible(model: Model.IModel, visible: string[]): void;
        /**
         * Add temporary visible attributes for the model.
         *
         * @param {Model} model
         * @param {string|string[]} keys
         */
        addVisible(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
        /**
         * Determine if the given attribute may be included in JSON.
         *
         * @param {Model} model
         * @param {string} key
         */
        isVisible(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
        /**
         * Get the hidden attributes for the model.
         *
         * @param {Model} model
         */
        getHidden(model: Model.IModel): string[];
        /**
         * Set hidden attributes for the model. Warning: this function reset all hidden setting included static.
         *
         * @param {Model} model
         */
        setHidden(model: Model.IModel, hidden: string[]): void;
        /**
         * Add temporary hidden attributes for the model.
         *
         * @param {Model} model
         * @param {string|string[]} keys
         */
        addHidden(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
        /**
         * Determine if the given key hidden in JSON.
         *
         * @param {Model} model
         * @param {string} key
         */
        isHidden(model: Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
        /**
         * Convert the model instance to a plain object, visible and hidden are applied.
         *
         * @param {Model} model
         */
        attributesToObject(model: Model.IModel): object;
        /**
         * Convert the model relations to a plain object, visible and hidden are applied.
         *
         * @param {Model} model
         * @param {string[]} relations
         * @param {boolean} formatName
         */
        relationsToObject(model: Model.IModel, relations: string[] | undefined, formatName: boolean): object;
        /**
         * Convert the model instance to a plain object, visible and hidden are not applied.
         *
         * @param {Model} model
         * @param {string[]} relations
         * @param {boolean} formatName
         */
        toObject(model: Model.IModel, relations: string[] | undefined, formatName: boolean): object;
        /**
         * Convert the model instance to JSON string, visible and hidden are applied.
         *
         * @param {Model} model
         */
        toJson(model: Model.IModel, replacer?: (key: string, value: any) => any, space?: string | number): string;
    }
}
