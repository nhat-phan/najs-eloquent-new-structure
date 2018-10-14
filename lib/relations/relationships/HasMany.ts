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
import { ManyRowsExecutor } from './executors/ManyRowsExecutor'
import { ModelEvent } from '../../model/ModelEvent'

export class HasMany<T extends Model> extends HasOneOrMany<Collection<T>> implements IHasManyRelationship<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.HasMany
  protected executor: ManyRowsExecutor<T>

  getClassName(): string {
    return NajsEloquentClasses.Relation.Relationship.HasMany
  }

  getType(): string {
    return RelationshipType.HasMany
  }

  getExecutor(): ManyRowsExecutor<T> {
    if (!this.executor) {
      this.executor = new ManyRowsExecutor(this.getDataBucket()!, this.targetModel)
    }
    return this.executor
  }

  associate(...models: Array<T | T[]>): this {
    // root provides primary key for target, whenever the root get saved target should be updated as well
    const associatedModels = flatten(models)

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
}
register(HasMany, NajsEloquentClasses.Relation.Relationship.HasMany)
