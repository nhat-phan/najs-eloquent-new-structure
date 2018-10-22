/// <reference path="../model/IModel.ts" />
/// <reference path="../query-builders/IQueryBuilder.ts" />

namespace NajsEloquent.Relation {
  export interface IManyToManyRelationship<T> extends IRelationship<T> {
    /**
     * Create new pivot model instance.
     */
    newPivot(): Model.IModel
    /**
     * Create new pivot model instance with data.
     */
    newPivot(data: object): Model.IModel
    /**
     * Create new pivot model instance with data and guarded options.
     */
    newPivot(data: object, isGuarded: boolean): Model.IModel

    /**
     * Create new Pivot query.
     */
    newPivotQuery(): QueryBuilder.IQueryBuilder<Model.IModel>
    /**
     * Create new Pivot query with name.
     */
    newPivotQuery(name: string): QueryBuilder.IQueryBuilder<Model.IModel>

    /**
     * Attach an model to relation with model's id.
     *
     * @param {string} id
     */
    attach(id: string): Promise<this>
  }
}
