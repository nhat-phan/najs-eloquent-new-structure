/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelRelation.ts" />

import Model = NajsEloquent.Model.ModelInternal
import IRelation = NajsEloquent.Relation.IRelation
import IRelationFactory = NajsEloquent.Relation.IRelationFactory

export const RelationPublicApi: NajsEloquent.Model.IModelRelation = {
  getRelationByName<T = any>(this: Model, name: string): IRelation<T> {
    return this.driver.getRelationFeature().findByName(this, name)
  },

  defineRelationProperty(this: Model, name: string): IRelationFactory {
    return this.driver
      .getRelationFeature()
      .findDataByName(this, name)
      .getFactory()
  },

  defineRelationAccessor(this: Model, name: string): IRelationFactory {
    return this.defineRelationProperty(name)
  }
}
