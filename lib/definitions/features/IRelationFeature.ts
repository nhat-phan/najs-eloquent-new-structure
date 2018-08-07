/// <reference path="./IFeature.ts" />
/// <reference path="../model/IModel.ts" />
/// <reference path="../relations/IRelationDataBucket.ts" />

namespace NajsEloquent.Feature {
  export interface IRelationFeature extends IFeature {
    /**
     *
     * @param {Model} model
     */
    makeDataBucket(model: Model.IModel): Relation.IRelationDataBucket

    /**
     *
     * @param {Model} model
     */
    getDataBucket(model: Model.IModel): Relation.IRelationDataBucket | undefined

    /**
     *
     * @param {Model} model
     * @param {RelationDataBucket} dataBucket
     */
    setDataBucket(model: Model.IModel, dataBucket: Relation.IRelationDataBucket): void
  }
}
