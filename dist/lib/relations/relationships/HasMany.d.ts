/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IHasManyRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship;
import Collection = CollectJs.Collection;
import { HasOneOrMany } from './HasOneOrMany';
import { ManyRowsExecutor } from './executors/ManyRowsExecutor';
export declare class HasMany<T extends Model> extends HasOneOrMany<Collection<T>> implements IHasManyRelationship<T> {
    static className: string;
    protected executor: ManyRowsExecutor<T>;
    getClassName(): string;
    getType(): string;
    getExecutor(): ManyRowsExecutor<T>;
    associate(...models: Array<T | T[] | CollectJs.Collection<T>>): this;
}
