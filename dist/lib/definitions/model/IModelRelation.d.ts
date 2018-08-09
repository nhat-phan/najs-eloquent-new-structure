/// <reference path="../relations/IRelation.d.ts" />
/// <reference path="../relations/IRelationFactory.d.ts" />
declare namespace NajsEloquent.Model {
    interface IModelRelation {
        /**
         * Get relation by given name.
         * @param {string} name
         */
        getRelationByName<T = any>(name: string): Relation.IRelation<T>;
        /**
         * Define a relation property by name
         *
         * @param {string} name
         */
        defineRelationProperty(name: string): Relation.IRelationFactory;
        /**
         * Define a relation property by name
         *
         * @param {string} name
         */
        defineRelationAccessor(name: string): Relation.IRelationFactory;
    }
}
