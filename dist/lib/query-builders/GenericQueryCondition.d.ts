/// <reference path="interfaces/IQueryConvention.d.ts" />
/// <reference path="interfaces/IConditionQuery.d.ts" />
export declare class GenericQueryCondition implements NajsEloquent.QueryBuilder.IConditionQuery {
    convention: NajsEloquent.QueryBuilder.IQueryConvention;
    isSubQuery: boolean;
    bool: 'and' | 'or';
    operator: NajsEloquent.QueryBuilder.Operator;
    field: string;
    value: string;
    queries: GenericQueryCondition[];
    protected constructor();
    static create(convention: NajsEloquent.QueryBuilder.IQueryConvention, operator: 'and' | 'or', arg0: string | NajsEloquent.QueryBuilder.SubCondition, arg1: NajsEloquent.QueryBuilder.Operator | any, arg2: any): GenericQueryCondition;
    toObject(): Object;
    protected buildQuery(bool: 'and' | 'or', arg0: string | NajsEloquent.QueryBuilder.SubCondition, arg1: NajsEloquent.QueryBuilder.Operator | any, arg2: any): this;
    protected buildSubQuery(queryCondition: GenericQueryCondition, arg0: Function): this;
    where(conditionBuilder: NajsEloquent.QueryBuilder.SubCondition): this;
    where(field: string, value: any): this;
    where(field: string, operator: NajsEloquent.QueryBuilder.Operator, value: any): this;
    orWhere(conditionBuilder: NajsEloquent.QueryBuilder.SubCondition): this;
    orWhere(field: string, value: any): this;
    orWhere(field: string, operator: NajsEloquent.QueryBuilder.Operator, value: any): this;
    andWhere(conditionBuilder: NajsEloquent.QueryBuilder.SubCondition): this;
    andWhere(field: string, value: any): this;
    andWhere(field: string, operator: NajsEloquent.QueryBuilder.Operator, value: any): this;
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
    whereBetween(field: string, range: [any, any]): this;
    andWhereBetween(field: string, range: [any, any]): this;
    orWhereBetween(field: string, range: [any, any]): this;
}
