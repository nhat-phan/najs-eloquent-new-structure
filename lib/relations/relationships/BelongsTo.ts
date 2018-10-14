/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IBelongsToRelationship.ts" />

import Model = NajsEloquent.Model.IModel
import IBelongsToRelationship = NajsEloquent.Relation.IBelongsToRelationship

import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { relationFeatureOf } from '../../util/accessors'
import { OneRowExecutor } from './executors/OneRowExecutor'

export class BelongsTo<T extends Model> extends HasOneOrMany<T> implements IBelongsToRelationship<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.BelongsTo
  protected executor: OneRowExecutor<T>

  getClassName(): string {
    return NajsEloquentClasses.Relation.Relationship.BelongsTo
  }

  getType(): string {
    return RelationshipType.BelongsTo
  }

  getExecutor(): OneRowExecutor<T> {
    if (!this.executor) {
      this.executor = new OneRowExecutor(this.getDataBucket()!, this.targetModel)
    }
    return this.executor
  }

  dissociate() {
    this.rootModel.setAttribute(
      this.rootKeyName,
      relationFeatureOf(this.rootModel).getEmptyValueForRelationshipForeignKey(this.rootModel, this.rootKeyName)
    )
  }
}
register(BelongsTo, NajsEloquentClasses.Relation.Relationship.BelongsTo)
