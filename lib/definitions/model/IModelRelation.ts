/// <reference path="../relations/IRelationship.ts" />
/// <reference path="../relations/IRelationshipFactory.ts" />

namespace NajsEloquent.Model {
  export interface IModelRelation {
    /**
     * Get relationship by given name.
     * @param {string} name
     */
    getRelationshipByName<T = any>(name: string): Relation.IRelationship<T>

    /**
     * Define a relationship property by name
     *
     * @param {string} name
     */
    defineRelation(name: keyof this): Relation.IRelationshipFactory

    /**
     * Load the relationship
     */
    load<T>(...args: Array<keyof this | string | string[]>): Promise<T>

    /**
     * Determine that the relation is loaded or not. Please note that it only determine direct relation and can not
     * determine nested relations like: "direct-relation.relation-of-direct-relation"
     *
     * @param {string} relation
     */
    isLoaded(relation: string): boolean

    /**
     * Get loaded relations.
     */
    getLoaded(): string[]
  }
}
