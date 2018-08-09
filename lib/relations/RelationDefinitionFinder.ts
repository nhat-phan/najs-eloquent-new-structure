/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />

import IModel = NajsEloquent.Model.IModel
import RelationDefinition = NajsEloquent.Relation.RelationDefinition
import RelationDefinitions = NajsEloquent.Relation.RelationDefinitions
import { RelationBase } from './RelationBase'

export class RelationDefinitionFinder {
  model: IModel
  prototype: object
  bases: object[]

  constructor(model: IModel, prototype: object, bases: object[]) {
    this.model = model
    this.prototype = prototype
    this.bases = bases
  }

  getDefinitions() {
    return [this.prototype, ...this.bases]
      .map(prototype => {
        return this.findDefinitionsInPrototype(prototype)
      })
      .reduce((memo: RelationDefinitions, definitions: RelationDefinitions) => {
        const names = Object.keys(definitions)

        if (names.length === 0) {
          return memo
        }

        for (const name in names) {
          if (typeof memo[name] === 'undefined') {
            continue
          }

          memo[name] = definitions[name]
        }

        return memo
      }, {})
  }

  findDefinitionsInPrototype(prototype: object) {
    const descriptors = Object.getOwnPropertyDescriptors(prototype)

    return Object.keys(descriptors).reduce((value, name) => {
      if (name === 'constructor') {
        return value
      }

      const definition = this.findDefinition(name, descriptors[name])
      if (definition) {
        value[name] = definition
      }

      return value
    }, {})
  }

  findDefinition(target: string, descriptor: PropertyDescriptor): RelationDefinition | undefined {
    try {
      if (typeof descriptor.value === 'function') {
        const relation = descriptor.value!.call(this.model)
        if (relation instanceof RelationBase) {
          return {
            target: target,
            accessor: relation.getName(),
            targetType: 'function'
          }
        }
      }

      if (typeof descriptor.get === 'function') {
        const relation = descriptor.value!.call(this.model)
        if (relation instanceof RelationBase) {
          return {
            accessor: relation.getName(),
            target: target,
            targetType: 'getter'
          }
        }
      }
    } catch (error) {
      // console.error(error)
    }

    return undefined
  }
}
