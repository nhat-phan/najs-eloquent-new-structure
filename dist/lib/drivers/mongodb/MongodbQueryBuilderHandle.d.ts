/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-grammars/IBasicQuery.d.ts" />
/// <reference path="../../definitions/query-grammars/IConditionQuery.d.ts" />
/// <reference path="../../definitions/query-builders/IConvention.d.ts" />
/// <reference path="../../definitions/query-builders/IExecutor.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IExecutor = NajsEloquent.QueryBuilder.IExecutor;
import IConvention = NajsEloquent.QueryBuilder.IConvention;
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery;
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery;
import { QueryBuilderHandleBase } from '../../query-builders/QueryBuilderHandleBase';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { ConditionQueryHandle } from '../../query-builders/shared/ConditionQueryHandle';
export declare class MongodbQueryBuilderHandle extends QueryBuilderHandleBase {
    protected basicQuery: BasicQuery;
    protected conditionQuery: ConditionQueryHandle;
    protected convention: IConvention;
    constructor(model: IModel);
    getBasicQuery(): IBasicQuery;
    getConditionQuery(): IConditionQuery;
    getQueryConvention(): IConvention;
    getQueryExecutor(): IExecutor;
}
