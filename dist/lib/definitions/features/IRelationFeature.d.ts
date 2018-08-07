/// <reference path="IFeature.d.ts" />
/// <reference path="../model/IModel.d.ts" />
/// <reference path="../relations/IRelationDataBucket.d.ts" />
declare namespace NajsEloquent.Feature {
    interface IRelationFeature extends IFeature {
        /**
         *
         * @param {Model} model
         */
        makeDataBucket(model: Model.IModel): Relation.IRelationDataBucket;
        /**
         *
         * @param {Model} model
         */
        getDataBucket(model: Model.IModel): Relation.IRelationDataBucket | undefined;
        /**
         *
         * @param {Model} model
         * @param {RelationDataBucket} dataBucket
         */
        setDataBucket(model: Model.IModel, dataBucket: Relation.IRelationDataBucket): void;
    }
}
