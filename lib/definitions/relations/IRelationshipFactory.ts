/// <reference path="../model/IModel.ts" />

namespace NajsEloquent.Relation {
  export interface IRelationshipFactory {
    /**
     * Has one relationship
     *
     * @param {string|ModelDefinition} model
     */
    hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T> | string): IHasOneRelationship<T>

    /**
     * Has one relationship
     *
     * @param {string|ModelDefinition} model
     * @param {string} foreignKey
     */
    hasOne<T extends Model.IModel>(model: Model.ModelDefinition<T> | string, foreignKey: string): IHasOneRelationship<T>

    /**
     * Has one relationship
     *
     * @param {string|ModelDefinition} model
     * @param {string} foreignKey
     * @param {string} localKey
     */
    hasOne<T extends Model.IModel>(
      model: Model.ModelDefinition<T> | string,
      foreignKey: string,
      localKey: string
    ): IHasOneRelationship<T>

    // /**
    //  * Has one relationship
    //  *
    //  * @param {string|ModelDefinition} model
    //  */
    // hasMany<T>(model: Model.ModelDefinition<T> | string): IHasMany<T>

    // /**
    //  * Has one relationship
    //  *
    //  * @param {string|ModelDefinition} model
    //  * @param {string} foreignKey
    //  */
    // hasMany<T>(model: Model.ModelDefinition<T> | string, foreignKey: string): IHasMany<T>

    // /**
    //  * Has one relationship
    //  *
    //  * @param {string|ModelDefinition} model
    //  * @param {string} foreignKey
    //  * @param {string} localKey
    //  */
    // hasMany<T>(model: Model.ModelDefinition<T> | string, foreignKey: string, localKey: string): IHasMany<T>

    /**
     * Has one inverse relationship
     *
     * @param {string|ModelDefinition} model
     */
    belongsTo<T>(model: Model.ModelDefinition): IHasOneRelationship<T>

    /**
     * Has one inverse relationship
     *
     * @param {string|ModelDefinition} model
     * @param {string} foreignKey
     */
    belongsTo<T>(model: Model.ModelDefinition, foreignKey: string): IHasOneRelationship<T>

    /**
     * Has one inverse relationship
     *
     * @param {string|ModelDefinition} model
     * @param {string} foreignKey
     * @param {string} localKey
     */
    belongsTo<T>(model: Model.ModelDefinition, foreignKey: string, localKey: string): IHasOneRelationship<T>
  }
}
