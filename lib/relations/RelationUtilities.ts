import { Relation } from './Relation'
import IModel = NajsEloquent.Model.IModel

export const RelationUtilities = {
  isLoadedInDataBucket<T>(relation: Relation<T>, model: IModel, name: string) {
    const bucket = relation.getDataBucket()
    if (!bucket) {
      return false
    }

    return bucket.getMetadataOf(model).loaded.indexOf(name) !== -1
  },

  markLoadedInDataBucket<T>(relation: Relation<T>, model: IModel, name: string) {
    const bucket = relation.getDataBucket()
    if (!bucket) {
      return
    }

    bucket.getMetadataOf(model).loaded.push(name)
  }
}
