/// <reference path="../model/IModel.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IRelationReference<Root, Target> {
        /**
         * Get base model instance.
         */
        getRootModel(): Root;
        /**
         * Get target model instance.
         */
        getTargetModel(): Target;
        /**
         * Get reference information.
         */
        getInfo(): object;
        /**
         * Get Query which is used for query target data.
         */
        getQuery(): QueryBuilder.IQueryBuilder<Target>;
    }
}
