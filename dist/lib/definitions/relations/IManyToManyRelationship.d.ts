/// <reference path="IManyToManyDefinition.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IManyToManyRelationship<T> extends IManyToManyDefinition<T> {
        /**
         * Attach an model to relation with model's id.
         *
         * @param {string} id
         */
        attach(id: string): Promise<this>;
    }
}
