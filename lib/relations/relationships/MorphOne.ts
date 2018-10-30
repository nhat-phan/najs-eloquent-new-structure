/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/data/IDataCollector.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />

import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition

import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { MorphOneExecutor } from './executors/MorphOneExecutor'

export class MorphOne<T> extends HasOneOrMany<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.MorphOne
  protected targetMorphTypeName: string
  protected executor: MorphOneExecutor<T>

  constructor(
    root: Model,
    relationName: string,
    target: ModelDefinition,
    targetType: string,
    targetKey: string,
    rootKey: string
  ) {
    super(root, relationName, target, targetKey, rootKey)
    this.targetMorphTypeName = targetType
  }

  getClassName(): string {
    return NajsEloquentClasses.Relation.Relationship.MorphOne
  }

  getType(): string {
    return RelationshipType.MorphOne
  }

  getExecutor(): MorphOneExecutor<T> {
    if (!this.executor) {
      this.executor = new MorphOneExecutor(
        this.getDataBucket()!,
        this.targetModel,
        this.targetMorphTypeName,
        HasOneOrMany.findMorphType(this.rootModel)
      )
    }
    return this.executor
  }
}
register(MorphOne, NajsEloquentClasses.Relation.Relationship.MorphOne)
