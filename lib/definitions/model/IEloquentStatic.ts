/// <reference path="./IEloquent.ts" />
/// <reference path="../query-builders/IQueryBuilder.ts" />

namespace NajsEloquent.Model {
  export interface IEloquentStatic<T, Q extends QueryBuilder.IQueryBuilder<any, any>> extends IEloquent<T, Q> {
    new (data?: Object): IModel & T & IEloquent<T, Q>

    Class<ChildType>(): IEloquentStatic<ChildType & T, Q>

    /**
     * Start new query of model.
     */
    newQuery(): Q

    /**
     * Start new query of model with name.
     */
    newQuery(name: string): Q
  }
}
