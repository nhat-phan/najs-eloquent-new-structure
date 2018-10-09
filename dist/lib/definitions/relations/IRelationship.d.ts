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
    type RelationshipFetchType = 'lazy' | 'eager';
    interface IRelationship<T> {
        /**
         * Set sub-relation with will be loaded when current relation load.
         *
         * @param relations
         */
        with(...relations: Array<string | string[]>): this;
        /**
         * Get data of the relationship.
         */
        getData(): T | undefined | null;
        /**
         * Determine the relationship is loaded or not.
         */
        isLoaded(): boolean;
        /**
         * load relationship data, use eagerLoad() if it's possible otherwise will use lazyLoad().
         */
        load(): Promise<T | undefined | null>;
        /**
         * Lazy load relationship.
         */
        lazyLoad(): Promise<T | undefined | null>;
        /**
         * Eager load relationship.
         */
        eagerLoad(): Promise<T | undefined | null>;
        /**
         * Get RelationDataBucket which contains eager data.
         */
        getDataBucket(): IRelationDataBucket | undefined;
        /**
         * Get relationship type
         */
        getType(): string;
        /**
         * Determine that current relationship is an inverse of given relationship or not.
         *
         * @param {Relationship} relation
         */
        isInverseOf<K = any>(relation: IRelationship<K>): boolean;
    }
}