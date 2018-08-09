/// <reference path="../../definitions/relations/IRelation.d.ts" />
/// <reference path="../../definitions/relations/IHasOne.d.ts" />
import { RelationBase } from '../RelationBase';
export declare class HasOne<T> extends RelationBase<T> implements NajsEloquent.Relation.IHasOne<T> {
    getClassName(): string;
    getType(): string;
    buildData(): T | undefined | null;
    lazyLoad(): Promise<T | undefined | null>;
    eagerLoad(): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean;
}
