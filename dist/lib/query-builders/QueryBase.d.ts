/// <reference path="../definitions/query-builders/IConvention.d.ts" />
import IConvention = NajsEloquent.QueryBuilder.IConvention;
export declare abstract class QueryBase {
    static DefaultConvention: IConvention;
    protected name: string;
    protected logGroup: string;
    protected primaryKeyName: string;
    protected convention: IConvention;
    constructor(primaryKeyName?: string);
    abstract orderBy(field: string, direction?: string): this;
    protected getQueryConvention(): IConvention;
    queryName(name: string): this;
    setLogGroup(group: string): this;
    getPrimaryKeyName(): string;
}
