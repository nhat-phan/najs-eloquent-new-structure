/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IHasManyRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IDataCollector = NajsEloquent.Data.IDataCollector;
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship;
import Collection = CollectJs.Collection;
import { HasOneOrMany } from './HasOneOrMany';
export declare class HasMany<T extends Model> extends HasOneOrMany<Collection<T>> implements IHasManyRelationship<T> {
    static className: string;
    getClassName(): string;
    getType(): string;
    executeQuery(queryBuilder: IQueryBuilder<T>): Promise<Collection<T>>;
    executeCollector(collector: IDataCollector<any>): Collection<T>;
    getEmptyValue(): Collection<T>;
}
