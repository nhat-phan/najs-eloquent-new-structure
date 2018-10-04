/// <reference path="../relations/IRelationship.ts" />
/// <reference path="../relations/IRelationshipFactory.ts" />

namespace NajsEloquent.Model {
  export interface IModelRelation {
    /**
     * Get relationship by given name.
     * @param {string} name
     */
    getRelationshipByName<T = any>(name: keyof this): Relation.IRelationship<T>

    /**
     * Define a relationship property by name
     *
     * @param {string} name
     */
    defineRelation(name: keyof this): Relation.IRelationshipFactory
  }
}
