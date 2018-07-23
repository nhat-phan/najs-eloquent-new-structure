/// <reference path="../../../../lib/model/new-definitions/poc.d.ts" />
declare class Model implements POC.IModel {
    newQuery(): QueryBuilder<this>;
}
interface QueryBuilder<T = any> extends POC.IQueryBuilder<T> {
}
declare class QueryBuilder<T = any> implements POC.IQueryBuilder<T> {
    where(): this;
    get(): Promise<T>;
}
declare class KnexQueryBuilder<T> extends QueryBuilder<T> {
    join(): this;
}
interface KnexQuery {
    newQuery(): KnexQueryBuilder<this>;
}
declare class KnexModel extends Model {
    newQuery(): KnexQueryBuilder<this>;
}
declare class User extends KnexModel {
    name: string;
}
declare function run(): Promise<void>;
