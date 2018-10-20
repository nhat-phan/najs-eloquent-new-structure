/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />
/// <reference path="../definitions/relations/IRelationshipFactory.ts" />
/// <reference path="../definitions/relations/IHasOneRelationship.ts" />
/// <reference path="../definitions/relations/IManyToManyRelationship.ts" />

import IModel = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import IRelationship = NajsEloquent.Relation.IRelationship
import IHasOneRelationship = NajsEloquent.Relation.IHasOneRelationship
import IBelongsToRelationship = NajsEloquent.Relation.IBelongsToRelationship
import IHasManyRelationship = NajsEloquent.Relation.IHasManyRelationship
import IManyToManyRelationship = NajsEloquent.Relation.IManyToManyRelationship

import * as pluralize from 'pluralize'
import { HasOne } from './relationships/HasOne'
import { BelongsTo } from './relationships/BelongsTo'
import { HasMany } from './relationships/HasMany'
import { ManyToMany } from './relationships/ManyToMany'
import { make } from 'najs-binding'
import { parse_string_with_dot_notation } from '../util/functions'

export class RelationshipFactory {
  protected rootModel: IModel
  protected name: string
  protected relationship: IRelationship<any>

  constructor(rootModel: IModel, name: string) {
    this.rootModel = rootModel
    this.name = name
  }

  make<T extends IRelationship<any>>(className: string, params: any[], modifier?: (relation: T) => void): T {
    if (!this.relationship) {
      this.relationship = make<T>(className, [this.rootModel, this.name, ...params])

      if (modifier) {
        modifier(this.relationship as T)
      }
    }

    return this.relationship as T
  }

  findForeignKeyName(referencing: IModel, referenced: IModel) {
    const referencedNameParts = parse_string_with_dot_notation(referenced.getModelName())

    return referencing.formatAttributeName(referencedNameParts.last + '_id')
  }

  protected findHasOneOrHasManyKeys(target: ModelDefinition<any>, targetKey?: string, localKey?: string) {
    const targetKeyName =
      typeof targetKey === 'undefined' ? this.findForeignKeyName(make<IModel>(target), this.rootModel) : targetKey
    const rootKeyName = typeof localKey === 'undefined' ? this.rootModel.getPrimaryKeyName() : localKey

    return { targetKeyName, rootKeyName }
  }

  hasOne<T extends IModel>(
    target: ModelDefinition<any>,
    targetKey?: string,
    localKey?: string
  ): IHasOneRelationship<T> {
    const keys = this.findHasOneOrHasManyKeys(target, targetKey, localKey)

    return this.make<HasOne<T>>(HasOne.className, [target, keys.targetKeyName, keys.rootKeyName])
  }

  hasMany<T extends IModel>(
    target: ModelDefinition<any>,
    targetKey?: string,
    localKey?: string
  ): IHasManyRelationship<T> {
    const keys = this.findHasOneOrHasManyKeys(target, targetKey, localKey)

    return this.make<HasMany<T>>(HasMany.className, [target, keys.targetKeyName, keys.rootKeyName])
  }

  belongsTo<T extends IModel>(
    target: ModelDefinition<any>,
    targetKey?: string,
    localKey?: string
  ): IBelongsToRelationship<T> {
    const targetModel = make<IModel>(target)
    const targetKeyName = typeof targetKey === 'undefined' ? targetModel.getPrimaryKeyName() : targetKey
    const rootKeyName =
      typeof localKey === 'undefined' ? this.findForeignKeyName(this.rootModel, targetModel) : localKey

    return this.make<BelongsTo<T>>(BelongsTo.className, [target, targetKeyName, rootKeyName])
  }

  findPivotTableName(a: IModel, b: IModel) {
    const names = [
      a.formatAttributeName(parse_string_with_dot_notation(a.getModelName()).last),
      b.formatAttributeName(parse_string_with_dot_notation(b.getModelName()).last)
    ]

    return pluralize(
      names
        .sort(function(a, b) {
          const comparedA = a.toLowerCase()
          const comparedB = b.toLowerCase()
          if (comparedA === comparedB) {
            return 0
          }
          return comparedA > comparedB ? 1 : -1
        })
        .join('_')
    )
  }

  findPivotReferenceName(model: IModel) {
    const targetName = parse_string_with_dot_notation(model.getModelName()).last

    return model.formatAttributeName(targetName + '_id')
  }

  belongsToMany<T extends IModel>(
    target: Definition<T>,
    pivot?: Definition<any>,
    pivotTargetKeyName?: string,
    pivotRootKeyName?: string,
    targetKeyName?: string,
    rootKeyName?: string
  ): IManyToManyRelationship<T> {
    const targetModel = make<IModel>(target)
    if (!pivot) {
      pivot = this.findPivotTableName(targetModel, this.rootModel)
    }

    if (!pivotTargetKeyName) {
      pivotTargetKeyName = this.findPivotReferenceName(targetModel)
    }

    if (!pivotRootKeyName) {
      pivotRootKeyName = this.findPivotReferenceName(this.rootModel)
    }

    if (!targetKeyName) {
      targetKeyName = targetModel.getPrimaryKeyName()
    }

    if (!rootKeyName) {
      rootKeyName = this.rootModel.getPrimaryKeyName()
    }

    return this.make<ManyToMany<T>>(ManyToMany.className, [
      target,
      pivot,
      pivotTargetKeyName,
      pivotRootKeyName,
      targetKeyName,
      rootKeyName
    ])
  }
}
