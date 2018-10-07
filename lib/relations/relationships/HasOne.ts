/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IHasOneRelationship.ts" />

import Model = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import IDataCollector = NajsEloquent.Data.IDataCollector
import IHasOneRelationship = NajsEloquent.Relation.IHasOneRelationship

import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { ModelEvent } from '../../model/ModelEvent'

export class HasOne<T extends Model> extends HasOneOrMany<T> implements IHasOneRelationship<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.HasOne

  getClassName(): string {
    return NajsEloquentClasses.Relation.Relationship.HasOne
  }

  getType(): string {
    return RelationshipType.HasOne
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

  associate(model: T): this {
    // root provides primary key for target, whenever the root get saved target should be updated as well
    const primaryKey = this.rootModel.getAttribute(this.rootKeyName)
    if (!primaryKey) {
      this.rootModel.once(ModelEvent.Saved, async () => {
        model.setAttribute(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName))
        await model.save()
      })
      return this
    }

    model.setAttribute(this.targetKeyName, primaryKey)
    this.rootModel.once(ModelEvent.Saved, async () => {
      await model.save()
    })
    return this
  }
}
register(HasOne, NajsEloquentClasses.Relation.Relationship.HasOne)
