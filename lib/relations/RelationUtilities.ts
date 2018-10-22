/// <reference path="../definitions/relations/IRelationDataBucket.ts" />

import IModel = NajsEloquent.Model.IModel
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import { Relationship } from './Relationship'

export const RelationUtilities = {
  isLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string) {
    const bucket = relationship.getDataBucket()
    if (!bucket) {
      return false
    }

    return bucket.getMetadataOf(model).loaded.indexOf(name) !== -1
  },

  markLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string) {
    const bucket = relationship.getDataBucket()
    if (!bucket) {
      return
    }

    bucket.getMetadataOf(model).loaded.push(name)
  },

  getAttributeListInDataBucket(dataBucket: IRelationDataBucket, model: IModel, attribute: string) {
    const dataBuffer = dataBucket.getDataOf(model)
    const reader = dataBuffer.getDataReader()
    return dataBuffer.map(item => reader.getAttribute(item, attribute))
  }
}
