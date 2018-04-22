export interface QueryBuilderWrapper<T> extends NajsEloquent.Wrapper.IQueryBuilderWrapper<T> {
}
export declare class QueryBuilderWrapper<T> {
    protected modelName: string;
    constructor(model: string, queryBuilder: NajsEloquent.QueryBuilder.IQueryBuilder & NajsEloquent.QueryBuilder.IFetchResultQuery<T>);
    protected createCollection(result: Object[]): CollectJs.Collection<NajsEloquent.Model.IModel<T> & T>;
    protected createInstance(result: Object): NajsEloquent.Model.IModel<T> & T;
    first(id?: any): Promise<(NajsEloquent.Model.IModel<T> & T) | null>;
    find(id?: any): Promise<(NajsEloquent.Model.IModel<T> & T) | null>;
    get(...fields: Array<string | string[]>): Promise<CollectJs.Collection<NajsEloquent.Model.IModel<T> & T>>;
    all(...fields: Array<string | string[]>): Promise<CollectJs.Collection<NajsEloquent.Model.IModel<T> & T>>;
    pluck(valueKey: string, indexKey?: string): Promise<Object>;
    findById(id: any): Promise<NajsEloquent.Model.IModel<T> & T | null>;
    findOrFail(id: any): Promise<NajsEloquent.Model.IModel<T> & T>;
    firstOrFail(id: any): Promise<NajsEloquent.Model.IModel<T> & T>;
    static readonly FORWARD_FUNCTIONS: string[];
}
