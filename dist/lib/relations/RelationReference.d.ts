/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelationReference.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IRelationReference = NajsEloquent.Relation.IRelationReference;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
export declare class RelationReference<Root extends Model, Target extends Model> implements IRelationReference<Root, Target> {
    protected root: Root;
    protected target: Target;
    protected targetName: string;
    constructor(root: Root);
    getRootModel(): Root;
    getTargetModel(): Target;
    getInfo(): object;
    getQuery(): IQueryBuilder<Target>;
}
