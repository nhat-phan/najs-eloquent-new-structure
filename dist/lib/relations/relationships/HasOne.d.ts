/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelation.d.ts" />
/// <reference path="../../definitions/relations/IHasOne.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IDataCollector = NajsEloquent.Data.IDataCollector;
import IHasOne = NajsEloquent.Relation.IHasOne;
import { HasOneOrMany } from './HasOneOrMany';
export declare class HasOne<T extends Model> extends HasOneOrMany<T> implements IHasOne<T> {
    static className: string;
    getClassName(): string;
    getType(): string;
    executeQuery(queryBuilder: IQueryBuilder<T>): Promise<T | undefined | null>;
    executeCollector(collector: IDataCollector<any>): T | undefined | null;
    getEmptyValue(): T | undefined;
}
