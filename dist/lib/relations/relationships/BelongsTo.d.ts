/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IBelongsToRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IBelongsToRelationship = NajsEloquent.Relation.IBelongsToRelationship;
import { HasOneOrMany } from './HasOneOrMany';
import { OneRowExecutor } from './executors/OneRowExecutor';
export declare class BelongsTo<T extends Model> extends HasOneOrMany<T> implements IBelongsToRelationship<T> {
    static className: string;
    protected executor: OneRowExecutor<T>;
    getClassName(): string;
    getType(): string;
    getExecutor(): OneRowExecutor<T>;
    dissociate(): void;
}
