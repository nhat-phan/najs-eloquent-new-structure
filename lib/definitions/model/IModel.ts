/// <reference path="../../contracts/Driver.ts" />
/// <reference path="../utils/IClassSetting.ts" />
/// <reference path="./IModelRecord.ts" />
/// <reference path="./IModelFillable.ts" />
/// <reference path="./IModelSerialization.ts" />
/// <reference path="./IModelTimestamps.ts" />
/// <reference path="./IModelSoftDeletes.ts" />
/// <reference path="./IModelRelation.ts" />
/// <reference path="../relations/IRelationDataBucket.ts" />

namespace NajsEloquent.Model {
  export type ModelDefinition<T extends IModel = IModel> = string | { new (): T }

  export declare class IModel {
    /**
     * Contains metadata data which shared for all model instances
     */
    protected sharedMetadata: object

    /**
     * The driver associated with the model.
     */
    protected driver: Najs.Contracts.Eloquent.Driver

    /**
     * The model's class setting
     */
    protected classSettings?: NajsEloquent.Util.IClassSetting

    /**
     * The model's attributes.
     */
    protected attributes: object

    /**
     * The model's relation definitions.
     */
    protected readonly relationDefinitions: NajsEloquent.Relation.RelationDefinitions

    /**
     * The model's relation data bucket.
     */
    protected relationDataBucket: NajsEloquent.Relation.IRelationDataBucket<any>

    /**
     * The model's relations data.
     */
    protected relations: { [name in string]: NajsEloquent.Relation.IRelationData<any> }
  }

  export interface IModel
    extends IModelRecord,
      IModelEvent,
      IModelFillable,
      IModelSerialization,
      IModelTimestamps,
      IModelSoftDeletes,
      IModelRelation {
    /**
     * Primary key of the model
     */
    id?: any

    /**
     * Get driver which is used by the model.
     */
    getDriver<T>(): Najs.Contracts.Eloquent.Driver<T>

    /**
     * Get model name.
     */
    getModelName(): string

    /**
     * Start new query of model.
     */
    query(): NajsEloquent.QueryBuilder.IQueryBuilder<this>

    /**
     * Start new query of model with name.
     */
    query(name: string): NajsEloquent.QueryBuilder.IQueryBuilder<this>
  }

  export type ModelInternal<T = any> = IModel & {
    driver: Najs.Contracts.Eloquent.Driver<T>

    relationDefinitions: NajsEloquent.Relation.RelationDefinitions

    relationDataBucket: NajsEloquent.Relation.IRelationDataBucket<T>

    relations: { [name in string]: NajsEloquent.Relation.IRelationData<any> }

    attributes: T
  }
}
