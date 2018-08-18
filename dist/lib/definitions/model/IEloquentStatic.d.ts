/// <reference path="IEloquent.d.ts" />
/// <reference path="../query-builders/IQueryBuilder.d.ts" />
declare namespace NajsEloquent.Model {
    interface IEloquentStatic<T, Q extends QueryBuilder.IQueryBuilder<any, any>> extends IEloquent<T, Q> {
        new (data?: Object): IEloquent<T, Q>;
        Class<ChildType>(): IEloquentStatic<ChildType & T, Q>;
        /**
         * Start new query of model.
         */
        newQuery(): Q;
        /**
         * Start new query of model with name.
         */
        newQuery(name: string): Q;
    }
}
