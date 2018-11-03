/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelSerialization.ts" />
import Model = NajsEloquent.Model.ModelInternal

import { flatten } from 'lodash'

function parse_relationsToObject_arguments(args: ArrayLike<string | string[]>) {
  if (args.length === 0) {
    return { formatName: true, relations: undefined }
  }

  if (args.length === 1 && typeof args[0] === 'boolean') {
    return { formatName: args[0] as any, relations: undefined }
  }

  const startIndex = args.length > 0 && typeof args[0] === 'boolean' ? 1 : 0
  const rest: Array<string | string[]> = []
  for (let i = startIndex; i < args.length; i++) {
    rest.push(args[i])
  }

  const formatName: boolean = startIndex === 1 ? (args[0] as any) : true
  return {
    formatName: formatName,
    relations: flatten(rest)
  }
}

export const SerializationPublicApi: NajsEloquent.Model.IModelSerialization = {
  getVisible(this: Model) {
    return this.driver.getSerializationFeature().getVisible(this)
  },

  getHidden(this: Model) {
    return this.driver.getSerializationFeature().getHidden(this)
  },

  markVisible(this: Model) {
    this.driver.getSerializationFeature().markVisible(this, arguments)

    return this
  },

  markHidden(this: Model) {
    this.driver.getSerializationFeature().markHidden(this, arguments)

    return this
  },

  isVisible(this: Model) {
    return this.driver.getSerializationFeature().isVisible(this, arguments)
  },

  isHidden(this: Model) {
    return this.driver.getSerializationFeature().isHidden(this, arguments)
  },

  attributesToObject<T extends object = object>(this: Model): T {
    return this.driver.getSerializationFeature().attributesToObject(this) as T
  },

  relationsToObject<T extends object = object>(this: Model): T {
    const args = parse_relationsToObject_arguments(arguments)
    return this.driver.getSerializationFeature().relationsToObject(this, args.relations, args.formatName) as T
  },

  toObject<T extends object = object>(this: Model): T {
    const args = parse_relationsToObject_arguments(arguments)
    return this.driver.getSerializationFeature().toObject(this, args.relations, args.formatName) as T
  },

  toJson(this: Model, replacer?: (key: string, value: any) => any, space?: string | number): string {
    return this.driver.getSerializationFeature().toJson(this, replacer, space)
  }
}
