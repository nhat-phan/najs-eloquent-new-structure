/// <reference path="../model/IModel.ts" />
/// <reference path="./IHasOneRelationship.ts" />
/// <reference path="./IBelongsToRelationship.ts" />
/// <reference path="./IHasManyRelationship.ts" />
/// <reference path="./IManyToManyRelationship.ts" />
import IModel = NajsEloquent.Model.IModel
import Definition = NajsEloquent.Model.ModelDefinition
import IHasOne = NajsEloquent.Relation.IHasOneRelationship
import IHasMany = NajsEloquent.Relation.IHasManyRelationship
import IBelongsTo = NajsEloquent.Relation.IBelongsToRelationship
import IManyToMany = NajsEloquent.Relation.IManyToManyRelationship

namespace NajsEloquent.Relation {
  export interface IRelationshipFactory {
    /**
     * Has one relationship
     *
     * @param {string|ModelDefinition} target
     */
    hasOne<T extends IModel>(target: Definition<T>): IHasOne<T>

    /**
     * Has one relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string} targetKey
     */
    hasOne<T extends IModel>(target: Definition<T>, targetKey: string): IHasOne<T>

    /**
     * Has one relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string} targetKey
     * @param {string} localKey
     */
    hasOne<T extends IModel>(target: Definition<T>, targetKey: string, localKey: string): IHasOne<T>

    /**
     * Has many relationship
     *
     * @param {string|ModelDefinition} target
     */
    hasMany<T extends IModel>(target: Definition<T>): IHasMany<T>

    /**
     * Has many relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string} targetKey
     */
    hasMany<T extends IModel>(target: Definition<T>, targetKey: string): IHasMany<T>

    /**
     * Has many relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string} targetKey
     * @param {string} localKey
     */
    hasMany<T extends IModel>(target: Definition<T>, targetKey: string, localKey: string): IHasMany<T>

    /**
     * Has one inverse relationship
     *
     * @param {string|ModelDefinition} target
     */
    belongsTo<T extends IModel>(target: Definition<T>): IBelongsTo<T>

    /**
     * Has one inverse relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string} targetKey
     */
    belongsTo<T extends IModel>(target: Definition<T>, targetKey: string): IBelongsTo<T>

    /**
     * Has one inverse relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string} targetKey
     * @param {string} localKey
     */
    belongsTo<T extends IModel>(target: Definition<T>, targetKey: string, localKey: string): IBelongsTo<T>

    /**
     * Define many to many relationship
     *
     * @param {string|ModelDefinition} target
     */
    belongsToMany<T extends IModel>(target: Definition<T>): IManyToMany<T>

    /**
     * Define many to many relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string|ModelDefinition} pivot
     */
    belongsToMany<T extends IModel>(target: Definition<T>, pivot: Definition<any>): IManyToMany<T>

    /**
     * Define many to many relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string|ModelDefinition} pivot
     * @param {string} pivotTargetKeyName
     * @param {string} pivotRootKeyName
     */
    belongsToMany<T extends IModel>(
      target: Definition<T>,
      pivot: Definition<any>,
      pivotTargetKeyName: string,
      pivotRootKeyName: string
    ): IManyToMany<T>

    /**
     * Define many to many relationship
     *
     * @param {string|ModelDefinition} target
     * @param {string|ModelDefinition} pivot
     * @param {string} pivotTargetKeyName
     * @param {string} pivotRootKeyName
     * @param {string} targetKeyName
     * @param {string} rootKeyName
     */
    belongsToMany<T extends IModel>(
      target: Definition<T>,
      pivot: Definition<any>,
      pivotTargetKeyName: string,
      pivotRootKeyName: string,
      targetKeyName: string,
      rootKeyName: string
    ): IManyToMany<T>
  }
}
