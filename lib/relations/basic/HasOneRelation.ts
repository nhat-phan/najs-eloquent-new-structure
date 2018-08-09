/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />

import { register } from 'najs-binding'
import { Relation } from '../Relation'
import { NajsEloquent } from '../../constants'

export class HasOneRelation<T> extends Relation<T> implements NajsEloquent.Relation.IHasOne<T> {
  getClassName(): string {
    return NajsEloquent.Relation.HasOneRelation
  }

  getType(): string {
    return 'HasOne'
  }

  buildData(): T | undefined | null {
    return undefined
  }

  async lazyLoad(): Promise<T | undefined | null> {
    return undefined
  }

  async eagerLoad(): Promise<T | undefined | null> {
    return undefined
  }

  isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean {
    return false
  }
}
register(HasOneRelation, NajsEloquent.Relation.HasOneRelation)
