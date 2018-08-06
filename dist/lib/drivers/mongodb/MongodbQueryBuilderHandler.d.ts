/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/query-grammars/IBasicQuery.d.ts" />
/// <reference path="../../definitions/query-grammars/IConditionQuery.d.ts" />
/// <reference path="../../definitions/query-builders/IConvention.d.ts" />
/// <reference path="../../definitions/query-builders/IExecutor.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IConvention = NajsEloquent.QueryBuilder.IConvention;
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery;
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery;
import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { ConditionQueryHandler } from '../../query-builders/shared/ConditionQueryHandler';
import { MongodbExecutor } from './MongodbExecutor';
export declare class MongodbQueryBuilderHandler extends QueryBuilderHandlerBase {
    protected basicQuery: BasicQuery;
    protected conditionQuery: ConditionQueryHandler;
    protected convention: IConvention;
    constructor(model: IModel);
    getBasicQuery(): IBasicQuery;
    getConditionQuery(): IConditionQuery;
    getQueryConvention(): IConvention;
    getQueryExecutor(): MongodbExecutor;
}
