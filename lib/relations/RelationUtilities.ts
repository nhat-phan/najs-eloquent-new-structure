import { Relationship } from './Relationship'
import IModel = NajsEloquent.Model.IModel

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
  }
}
