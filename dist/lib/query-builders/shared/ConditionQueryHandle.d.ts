/// <reference path="../../definitions/query-grammars/IBasicConditionQuery.d.ts" />
/// <reference path="../../definitions/query-builders/IConvention.d.ts" />
/// <reference path="../../definitions/query-builders/IConditionQueryHandle.d.ts" />
import SubCondition = NajsEloquent.QueryGrammar.SubCondition;
import Operator = NajsEloquent.QueryGrammar.Operator;
import Range = NajsEloquent.QueryGrammar.Range;
import IBasicConditionQuery = NajsEloquent.QueryGrammar.IBasicConditionQuery;
import IConvention = NajsEloquent.QueryBuilder.IConvention;
export declare class ConditionQueryHandle implements NajsEloquent.QueryBuilder.IConditionQueryHandle {
    basicConditionQuery: IBasicConditionQuery;
    convention: IConvention;
    constructor(basicConditionQuery: IBasicConditionQuery, convention: IConvention);
    where(conditionBuilder: SubCondition): this;
    where(field: string, value: any): this;
    where(field: string, operator: Operator, value: any): this;
    orWhere(conditionBuilder: SubCondition): this;
    orWhere(field: string, value: any): this;
    orWhere(field: string, operator: Operator, value: any): this;
    andWhere(arg0: any, arg1?: any, arg2?: any): this;
    whereNot(field: string, values: any): this;
    andWhereNot(field: string, values: any): this;
    orWhereNot(field: string, values: any): this;
    whereIn(field: string, values: Array<any>): this;
    andWhereIn(field: string, values: Array<any>): this;
    orWhereIn(field: string, values: Array<any>): this;
    whereNotIn(field: string, values: Array<any>): this;
    andWhereNotIn(field: string, values: Array<any>): this;
    orWhereNotIn(field: string, values: Array<any>): this;
    whereNull(field: string): this;
    andWhereNull(field: string): this;
    orWhereNull(field: string): this;
    whereNotNull(field: string): this;
    andWhereNotNull(field: string): this;
    orWhereNotNull(field: string): this;
    whereBetween(field: string, range: Range): this;
    andWhereBetween(field: string, range: Range): this;
    orWhereBetween(field: string, range: Range): this;
    whereNotBetween(field: string, range: Range): this;
    andWhereNotBetween(field: string, range: Range): this;
    orWhereNotBetween(field: string, range: Range): this;
}
