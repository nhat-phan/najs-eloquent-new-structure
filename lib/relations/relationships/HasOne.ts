/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />

import Model = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import IDataCollector = NajsEloquent.Data.IDataCollector
import IHasOne = NajsEloquent.Relation.IHasOne

import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationType } from '../RelationType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'

export class HasOne<T extends Model> extends HasOneOrMany<T> implements IHasOne<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.HasOne

  getClassName(): string {
    return NajsEloquentClasses.Relation.Relationship.HasOne
  }

  getType(): string {
    return RelationType.HasOne
  }

  async executeQuery(queryBuilder: IQueryBuilder<T>): Promise<T | undefined | null> {
    return queryBuilder.first() as any
  }

  executeCollector(collector: IDataCollector<any>): T | undefined | null {
    collector.limit(1)
    const result = collector.exec()
    if (result.length === 0) {
      return undefined
    }
    return this.getDataBucket()!.makeModel(this.targetModel, result[0]) as any
  }

  getEmptyValue(): T | undefined {
    return undefined
  }
}
register(HasOne, NajsEloquentClasses.Relation.Relationship.HasOne)
