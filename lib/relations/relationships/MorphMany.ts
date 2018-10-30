/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IMorphManyRelationship.ts" />
/// <reference path="../../definitions/data/IDataCollector.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />

import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import IMorphManyRelationship = NajsEloquent.Relation.IMorphManyRelationship
import Collection = CollectJs.Collection

import { register } from 'najs-binding'
import { HasOneOrMany } from './HasOneOrMany'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { MorphManyExecutor } from './executors/MorphManyExecutor'

export class MorphMany<T> extends HasOneOrMany<Collection<T>> implements IMorphManyRelationship<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.MorphMany
  protected targetMorphTypeName: string
  protected executor: MorphManyExecutor<T>

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
    return NajsEloquentClasses.Relation.Relationship.MorphMany
  }

  getType(): string {
    return RelationshipType.MorphMany
  }

  getExecutor(): MorphManyExecutor<T> {
    if (!this.executor) {
      this.executor = new MorphManyExecutor(
        this.getDataBucket()!,
        this.targetModel,
        this.targetMorphTypeName,
        HasOneOrMany.findMorphType(this.rootModel)
      )
    }
    return this.executor
  }
}
register(MorphMany, NajsEloquentClasses.Relation.Relationship.MorphMany)
