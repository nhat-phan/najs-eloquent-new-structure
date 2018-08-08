/// <reference path="./IFeature.ts" />
/// <reference path="../model/IModel.ts" />
/// <reference path="../relations/IRelationDataBucket.ts" />

namespace NajsEloquent.Feature {
  export interface IRelationFeature extends IFeature {
    /**
     * Make an RelationDataBucket instance which used by the driver.
     *
     * @param {Model} model
     */
    makeDataBucket(model: Model.IModel): Relation.IRelationDataBucket

    /**
     * Set attached data bucket of model instance.
     *
     * @param {Model} model
     */
    getDataBucket(model: Model.IModel): Relation.IRelationDataBucket | undefined

    /**
     * Set the data bucket to model instance.
     *
     * @param {Model} model
     * @param {RelationDataBucket} dataBucket
     */
    setDataBucket(model: Model.IModel, dataBucket: Relation.IRelationDataBucket): void

    /**
     * Create a key which is used by RelationDataBucket to distinct the tables/collections.
     *
     * @param {Model} model
     */
    createKeyForDataBucket(model: Model.IModel): string
  }
}
