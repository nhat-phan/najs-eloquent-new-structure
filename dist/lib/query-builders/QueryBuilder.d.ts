import { QueryBuilderHandleBase } from './QueryBuilderHandleBase';
export declare class QueryBuilder<T extends QueryBuilderHandleBase = QueryBuilderHandleBase> {
    protected handler: T;
    constructor(handler: T);
    queryName(name: string): this;
    setLogGroup(group: string): this;
    orderByAsc(field: string): this;
    orderByDesc(field: string): this;
}
