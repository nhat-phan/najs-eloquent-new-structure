/// <reference path="../model/IModel.d.ts" />
declare namespace NajsEloquent.Relation {
    type RelationDefinition = {
        accessor: string;
        target: string;
        targetType: 'getter' | 'function';
        targetClass?: string;
    };
    type RelationDefinitions = {
        [name in string]: RelationDefinition;
    };
    interface IRelation<T> {
        /**
         * Set sub-relation with will be loaded when current relation load.
         *
         * @param relations
         */
        with(...relations: Array<string | string[]>): this;
        /**
         * Get new query based on the relation.
         */
        getData(): T | undefined | null;
        /**
         * Determine the relation is loaded or not.
         */
        isLoaded(): boolean;
        /**
         * load relation data, use eagerLoad() if it's possible otherwise will use lazyLoad().
         */
        load(): Promise<T | undefined | null>;
        /**
         * Lazy load relation data.
         */
        lazyLoad(): Promise<T | undefined | null>;
        /**
         * Eager load relation data.
         */
        eagerLoad(): Promise<T | undefined | null>;
        /**
         * Get RelationDataBucket which contains eager data.
         */
        getDataBucket(): IRelationDataBucket | undefined;
        /**
         * Get relation type
         */
        getType(): string;
        /**
         * Determine that current relation is an inverse of given relation or not.
         *
         * @param {Relation} relation
         */
        isInverseOf<K = any>(relation: IRelation<K>): boolean;
    }
}
