/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IHasManyRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship;
import Collection = CollectJs.Collection;
import { HasOneOrMany } from './HasOneOrMany';
import { HasManyExecutor } from './executors/HasManyExecutor';
export declare class HasMany<T extends Model> extends HasOneOrMany<Collection<T>> implements IHasManyRelationship<T> {
    static className: string;
    protected executor: HasManyExecutor<T>;
    getClassName(): string;
    getType(): string;
    getExecutor(): HasManyExecutor<T>;
    flattenArguments(...models: Array<T | T[] | CollectJs.Collection<T>>): T[];
    associate(...models: Array<T | T[] | CollectJs.Collection<T>>): this;
    dissociate(...models: Array<T | T[] | CollectJs.Collection<T>>): this;
}
