/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelationReference.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IRelationReference = NajsEloquent.Relation.IRelationReference;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
export declare class RelationReference<Root extends Model, Target extends Model> implements IRelationReference<Root, Target> {
    protected root: Root;
    protected rootKeyName: string | undefined;
    protected target: Target;
    protected targetName: string;
    protected targetKeyName: string | undefined;
    constructor(root: Root);
    getRootModel(): Root;
    getRootKeyName(): string;
    getTargetModel(): Target;
    getInfo(): object;
    getQuery(): IQueryBuilder<Target>;
    createQueryByRootPrimaryKey(): void;
    createQueryByRootPrimaryKeys(ids: any[]): void;
    queryThrough(): void;
}
