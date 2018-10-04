/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IHasOneRelationship.ts" />

import Model = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import IDataCollector = NajsEloquent.Data.IDataCollector
import Collection = CollectJs.Collection

import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { make_collection } from '../../util/factory'

export class HasMany<T extends Model> extends HasOneOrMany<Collection<T>> {
  getClassName(): string {
    return NajsEloquentClasses.Relation.Relationship.HasOne
  }

  getType(): string {
    return RelationshipType.HasOne
  }

  async executeQuery(queryBuilder: IQueryBuilder<T>): Promise<Collection<T>> {
    return queryBuilder.get() as any
  }

  executeCollector(collector: IDataCollector<any>): Collection<T> {
    return this.getDataBucket()!.makeCollection(this.targetModel, collector.exec()) as any
  }

  getEmptyValue(): Collection<T> {
    return make_collection([]) as Collection<T>
  }
}
register(HasMany, NajsEloquentClasses.Relation.Relationship.HasOne)
