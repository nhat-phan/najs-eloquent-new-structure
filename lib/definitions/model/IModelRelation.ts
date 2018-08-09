/// <reference path="../relations/IRelation.ts" />
/// <reference path="../relations/IRelationFactory.ts" />

namespace NajsEloquent.Model {
  export interface IModelRelation {
    /**
     * Get relation by given name.
     * @param {string} name
     */
    getRelationByName<T = any>(name: string): Relation.IRelation<T>

    /**
     * Define a relation property by name
     *
     * @param {string} name
     */
    defineRelationProperty(name: string): Relation.IRelationFactory

    /**
     * Define a relation property by name
     *
     * @param {string} name
     */
    defineRelationAccessor(name: string): Relation.IRelationFactory
  }
}
