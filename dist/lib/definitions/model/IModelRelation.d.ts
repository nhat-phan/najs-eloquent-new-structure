/// <reference path="../relations/IRelationship.d.ts" />
/// <reference path="../relations/IRelationshipFactory.d.ts" />
declare namespace NajsEloquent.Model {
    interface IModelRelation {
        /**
         * Get relationship by given name.
         * @param {string} name
         */
        getRelationshipByName<T = any>(name: keyof this): Relation.IRelationship<T>;
        /**
         * Define a relationship property by name
         *
         * @param {string} name
         */
        defineRelation(name: keyof this): Relation.IRelationshipFactory;
        /**
         * Load the relationship
         */
        load<T>(...args: Array<keyof this | string | string[]>): Promise<T>;
    }
}
