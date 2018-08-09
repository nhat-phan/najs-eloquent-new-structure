import { Relation } from './Relation'
import IModel = NajsEloquent.Model.IModel

export const RelationUtilities = {
  isLoadedInDataBucket<T>(relation: Relation<T>, model: IModel, name: string) {
    const bucket = relation.getDataBucket()
    if (!bucket) {
      return false
    }

    return (
      bucket
        .getMetadata(model)
        .get<string[]>('loaded', [])
        .indexOf(name) !== -1
    )
  },

  markLoadedInDataBucket<T>(relation: Relation<T>, model: IModel, name: string) {
    const bucket = relation.getDataBucket()
    if (!bucket) {
      return
    }

    const metadata = bucket.getMetadata(model)

    if (!metadata.exists('loaded')) {
      metadata.set('loaded', [])
    }
    metadata.get<string[]>('loaded').push(name)
  }
}
