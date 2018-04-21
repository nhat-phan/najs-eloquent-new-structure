/// <reference path="IModelQueryAdvanced.d.ts" />
/// <reference path="../../query-builders/interfaces/IQueryBuilder.d.ts" />
/// <reference path="../../query-builders/interfaces/IFetchResultQuery.d.ts" />
/// <reference path="../../../../lib/collect.js/index.d.ts" />
declare namespace NajsEloquent.Model {
    class IQueryBuilderWrapper<T> {
        protected queryBuilder: NajsEloquent.QueryBuilder.IQueryBuilder & NajsEloquent.QueryBuilder.IFetchResultQuery<T>;
    }
    interface IQueryBuilderWrapper<T> extends NajsEloquent.QueryBuilder.IQueryBuilder, IModelQueryAdvanced<T> {
    }
}
