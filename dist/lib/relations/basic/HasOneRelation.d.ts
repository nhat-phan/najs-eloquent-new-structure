/// <reference path="../../definitions/relations/IRelation.d.ts" />
/// <reference path="../../definitions/relations/IHasOne.d.ts" />
import RelationFetchType = NajsEloquent.Relation.RelationFetchType;
import { Relation } from '../Relation';
export declare class HasOneRelation<T> extends Relation<T> implements NajsEloquent.Relation.IHasOne<T> {
    static type: string;
    getClassName(): string;
    getType(): string;
    collectData(): T | undefined | null;
    fetchData(type: RelationFetchType): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean;
}
