/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />

import { register } from 'najs-binding'
import { RelationBase } from '../RelationBase'
import { NajsEloquent } from '../../constants'

export class HasOne<T> extends RelationBase<T> implements NajsEloquent.Relation.IHasOne<T> {
  getClassName(): string {
    return NajsEloquent.Relation.HasOne
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
register(HasOne, NajsEloquent.Relation.HasOne)
