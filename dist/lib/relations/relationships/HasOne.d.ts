/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IHasOneRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IDataCollector = NajsEloquent.Data.IDataCollector;
import IHasOneRelationship = NajsEloquent.Relation.IHasOneRelationship;
import { HasOneOrMany } from './HasOneOrMany';
export declare class HasOne<T extends Model> extends HasOneOrMany<T> implements IHasOneRelationship<T> {
    static className: string;
    getClassName(): string;
    getType(): string;
    executeQuery(queryBuilder: IQueryBuilder<T>): Promise<T | undefined | null>;
    executeCollector(collector: IDataCollector<any>): T | undefined | null;
    getEmptyValue(): T | undefined;
    associate(model: T): this;
}
