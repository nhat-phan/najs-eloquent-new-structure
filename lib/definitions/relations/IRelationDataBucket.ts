/// <reference path="./IRelation.ts" />
/// <reference path="../model/IModel.ts" />
/// <reference path="../collect.js/index.d.ts" />

namespace NajsEloquent.Relation {
  export interface IRelationDataBucketMetadata {
    /**
     * Contains loaded relations of this model
     */
    loaded: string[]
  }

  export interface IRelationDataBucket {
    /**
     * add the model to bucket.
     *
     * @param {Model} model
     */
    add(model: Model.IModel): this

    /**
     * Create new model instance and push the record to eager bucket under given model.
     *
     * @param {Model} model
     * @param {object} rawData
     */
    makeModel<M extends Model.IModel = Model.IModel>(model: M, data: any): M

    /**
     * Get records gathered data of the RecordBucket by given model.
     *
     * @param {Model} model
     */
    getDataOf(model: Model.IModel): Data.IDataBuffer<object>

    /**
     * Get metadata object of given model.
     *
     * @param {Model} model
     */
    getMetadataOf(model: Model.IModel): IRelationDataBucketMetadata
  }
}
