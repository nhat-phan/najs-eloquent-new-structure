/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IHasOneRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IHasOneRelationship = NajsEloquent.Relation.IHasOneRelationship;
import { HasOneOrMany } from './HasOneOrMany';
import { OneRowExecutor } from './executors/OneRowExecutor';
export declare class HasOne<T extends Model> extends HasOneOrMany<T> implements IHasOneRelationship<T> {
    static className: string;
    protected executor: OneRowExecutor<T>;
    getClassName(): string;
    getType(): string;
    getExecutor(): OneRowExecutor<T>;
    associate(model: T): void;
}
