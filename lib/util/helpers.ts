import { Model } from '../model/Model'
import collect from 'collect.js'

const collection = collect([])
const Collection = Object.getPrototypeOf(collection).constructor

export function isModel(value: any): boolean {
  return value instanceof Model
}

export function isCollection(value: any): boolean {
  return value instanceof Collection
}

export function distinctModelByClassInCollection(collection: CollectJs.Collection<Model>) {
  const result: Model[] = []
  if (!isCollection(collection) || collection.isEmpty()) {
    return result
  }

  const collected = {}
  for (let i = 0, l = collection.count(); i < l; i++) {
    const model = collection.get(i)!
    if (collected[model.getModelName()] === true) {
      continue
    }
    collected[model.getModelName()] = true
    result.push(model)
  }
  return result
}
