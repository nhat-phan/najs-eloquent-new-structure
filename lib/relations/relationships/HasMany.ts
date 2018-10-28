/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IHasManyRelationship.ts" />

import Model = NajsEloquent.Model.IModel
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship
import Collection = CollectJs.Collection

import { flatten } from 'lodash'
import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { HasManyExecutor } from './executors/HasManyExecutor'
import { ModelEvent } from '../../model/ModelEvent'
import { isCollection } from '../../util/helpers'
import { relationFeatureOf } from '../../util/accessors'

export class HasMany<T extends Model> extends HasOneOrMany<Collection<T>> implements IHasManyRelationship<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.HasMany
  protected executor: HasManyExecutor<T>

  getClassName(): string {
    return NajsEloquentClasses.Relation.Relationship.HasMany
  }

  getType(): string {
    return RelationshipType.HasMany
  }

  getExecutor(): HasManyExecutor<T> {
    if (!this.executor) {
      this.executor = new HasManyExecutor(this.getDataBucket()!, this.targetModel)
    }
    return this.executor
  }

  flattenArguments(...models: Array<T | T[] | CollectJs.Collection<T>>): T[] {
    return flatten(
      models.map(item => {
        return isCollection(item) ? (item as CollectJs.Collection<T>).all() : (item as T | T[])
      })
    )
  }

  associate(...models: Array<T | T[] | CollectJs.Collection<T>>): this {
    // root provides primary key for target, whenever the root get saved target should be updated as well
    const associatedModels: T[] = this.flattenArguments.apply(this, arguments)

    const primaryKey = this.rootModel.getAttribute(this.rootKeyName)
    if (!primaryKey) {
      this.rootModel.once(ModelEvent.Saved, async () => {
        await Promise.all(
          associatedModels.map(model =>
            model.setAttribute(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName)).save()
          )
        )
      })
      return this
    }

    associatedModels.forEach(model => model.setAttribute(this.targetKeyName, primaryKey))
    this.rootModel.once(ModelEvent.Saved, async () => {
      await Promise.all(associatedModels.map(model => model.save()))
    })
    return this
  }

  dissociate(...models: Array<T | T[] | CollectJs.Collection<T>>): this {
    const dissociatedModels: T[] = this.flattenArguments.apply(this, arguments)

    dissociatedModels.forEach(model => {
      model.setAttribute(
        this.targetKeyName,
        relationFeatureOf(model).getEmptyValueForRelationshipForeignKey(model, this.targetKeyName)
      )
    })
    this.rootModel.once(ModelEvent.Saved, async () => {
      await Promise.all(dissociatedModels.map(model => model.save()))
    })

    return this
  }
}
register(HasMany, NajsEloquentClasses.Relation.Relationship.HasMany)
