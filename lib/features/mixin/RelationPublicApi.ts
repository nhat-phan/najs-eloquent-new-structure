/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelRelation.ts" />

import Model = NajsEloquent.Model.ModelInternal
import IRelationship = NajsEloquent.Relation.IRelationship
import IRelationshipFactory = NajsEloquent.Relation.IRelationshipFactory
import { flatten } from 'lodash'

export const RelationPublicApi: NajsEloquent.Model.IModelRelation = {
  getRelationshipByName<T = any>(this: Model, name: string): IRelationship<T> {
    return this.driver.getRelationFeature().findByName(this, name)
  },

  defineRelation(this: Model, name: string): IRelationshipFactory {
    return this.driver
      .getRelationFeature()
      .findDataByName(this, name)
      .getFactory()
  },

  load(this: Model, ...args: Array<string | string[]>): Promise<any> {
    const relationNames: string[] = flatten(arguments)
    return Promise.all(
      relationNames.map(name => {
        return this.getRelationshipByName(name as any).load()
      })
    )
  }
}
