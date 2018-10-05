/// <reference path="../model/IModel.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IRelationshipFactory {
        /**
         * Has one relationship
         *
         * @param {string|ModelDefinition} model
         */
        hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T> | string): IHasOneRelationship<T>;
        /**
         * Has one relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} foreignKey
         */
        hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T> | string, foreignKey: string): IHasOneRelationship<T>;
        /**
         * Has one relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} foreignKey
         * @param {string} localKey
         */
        hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T> | string, foreignKey: string, localKey: string): IHasOneRelationship<T>;
        /**
         * Has one inverse relationship
         *
         * @param {string|ModelDefinition} model
         */
        belongsTo<T>(model: Model.ModelDefinition): IHasOneRelationship<T>;
        /**
         * Has one inverse relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} foreignKey
         */
        belongsTo<T>(model: Model.ModelDefinition, foreignKey: string): IHasOneRelationship<T>;
        /**
         * Has one inverse relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} foreignKey
         * @param {string} localKey
         */
        belongsTo<T>(model: Model.ModelDefinition, foreignKey: string, localKey: string): IHasOneRelationship<T>;
    }
}
