/// <reference path="../model/IModel.ts" />
/// <reference path="../collect.js/index.d.ts" />

namespace NajsEloquent.Relation {
  export interface IRelationDataBucket<T = {}> {
    /**
     * Gather the model to bucket.
     *
     * @param {Model} model
     */
    gather(model: Model.IModel): this

    /**
     * Create new model instance and push the record to eager bucket under given model.
     *
     * @param {Model} model
     * @param {object} record
     */
    makeModel<M extends Model.IModel = Model.IModel>(model: M, record: T): M

    /**
     * Get records gathered data of the RecordBucket by given model.
     *
     * @param {Model} model
     */
    getRecords(model: Model.IModel): CollectJs.Collection<T>

    /**
     * Create unique key for given model.
     *
     * @param {Model} model
     */
    createKeyForModel(model: Model.IModel): string
  }
}
