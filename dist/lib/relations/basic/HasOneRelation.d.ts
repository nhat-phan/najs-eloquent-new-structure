/// <reference path="../../definitions/relations/IRelation.d.ts" />
/// <reference path="../../definitions/relations/IHasOne.d.ts" />
import { Relation } from '../Relation';
export declare class HasOneRelation<T> extends Relation<T> implements NajsEloquent.Relation.IHasOne<T> {
    getClassName(): string;
    getType(): string;
    buildData(): T | undefined | null;
    lazyLoad(): Promise<T | undefined | null>;
    eagerLoad(): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean;
}
