import { RelationUtilities } from './../RelationUtilities'
/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IHasManyRelationship.ts" />

import Model = NajsEloquent.Model.IModel
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship
import Collection = CollectJs.Collection

import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { HasManyExecutor } from './executors/HasManyExecutor'
import { ModelEvent } from '../../model/ModelEvent'
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

  associate(...models: Array<T | T[] | CollectJs.Collection<T>>): this {
    RelationUtilities.associateMany(models, this.rootModel, this.rootKeyName, target => {
      target.setAttribute(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName))
    })
    return this
  }

  dissociate(...models: Array<T | T[] | CollectJs.Collection<T>>): this {
    const dissociatedModels: T[] = RelationUtilities.flattenModels(models) as any[]

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
