/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />

import RelationFetchType = NajsEloquent.Relation.RelationFetchType
import { register } from 'najs-binding'
import { Relation } from '../Relation'
import { NajsEloquent } from '../../constants'

export class HasOneRelation<T> extends Relation<T> implements NajsEloquent.Relation.IHasOne<T> {
  static type: string = 'HasOne'

  getClassName(): string {
    return NajsEloquent.Relation.HasOneRelation
  }

  getType(): string {
    return HasOneRelation.type
  }

  collectData(): T | undefined | null {
    return undefined
  }

  async fetchData(type: RelationFetchType): Promise<T | undefined | null> {
    return undefined
  }

  isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean {
    return false
  }
}
register(HasOneRelation, NajsEloquent.Relation.HasOneRelation)
