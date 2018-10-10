/// <reference path="../model/IModel.d.ts" />
/// <reference path="IHasOneRelationship.d.ts" />
/// <reference path="IBelongsToRelationship.d.ts" />
/// <reference path="IHasManyRelationship.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IRelationshipFactory {
        /**
         * Has one relationship
         *
         * @param {string|ModelDefinition} model
         */
        hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T>): IHasOneRelationship<T>;
        /**
         * Has one relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} targetKey
         */
        hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T>, targetKey: string): IHasOneRelationship<T>;
        /**
         * Has one relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} targetKey
         * @param {string} localKey
         */
        hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T>, targetKey: string, localKey: string): IHasOneRelationship<T>;
        /**
         * Has many relationship
         *
         * @param {string|ModelDefinition} model
         */
        hasMany<T extends Model.IModel>(model: Model.ModelDefinition<T>): IHasManyRelationship<T>;
        /**
         * Has many relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} targetKey
         */
        hasMany<T extends Model.IModel>(model: Model.ModelDefinition<T>, targetKey: string): IHasManyRelationship<T>;
        /**
         * Has many relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} targetKey
         * @param {string} localKey
         */
        hasMany<T extends Model.IModel>(model: Model.ModelDefinition<T>, targetKey: string, localKey: string): IHasManyRelationship<T>;
        /**
         * Has one inverse relationship
         *
         * @param {string|ModelDefinition} model
         */
        belongsTo<T extends Model.IModel>(model: Model.ModelDefinition<T>): IBelongsToRelationship<T>;
        /**
         * Has one inverse relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} targetKey
         */
        belongsTo<T extends Model.IModel>(model: Model.ModelDefinition<T>, targetKey: string): IBelongsToRelationship<T>;
        /**
         * Has one inverse relationship
         *
         * @param {string|ModelDefinition} model
         * @param {string} targetKey
         * @param {string} localKey
         */
        belongsTo<T extends Model.IModel>(model: Model.ModelDefinition<T>, targetKey: string, localKey: string): IBelongsToRelationship<T>;
    }
}
