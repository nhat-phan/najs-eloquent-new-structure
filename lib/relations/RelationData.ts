/// <reference path="../definitions/relations/IRelationData.ts" />

export class RelationData<T> implements NajsEloquent.Relation.IRelationData<T> {
  protected data: T
  protected state: string
  protected factory: NajsEloquent.Relation.IRelationFactory
  protected loadType?: 'lazy' | 'eager'

  constructor(factory: NajsEloquent.Relation.IRelationFactory) {
    this.factory = factory
    this.state = 'unload'
  }

  getFactory(): NajsEloquent.Relation.IRelationFactory {
    return this.factory
  }

  isLoaded(): boolean {
    return this.state === 'loaded'
  }

  isBuilt(): boolean {
    return this.state === 'built'
  }

  markLoaded(): this {
    this.state = 'loaded'

    return this
  }

  markBuilt(): this {
    this.state = 'built'

    return this
  }

  getData(): T {
    return this.data
  }

  setData(data: T): this {
    this.data = data

    return this
  }

  getLoadType(): 'unknown' | 'lazy' | 'eager' {
    return this.loadType || 'unknown'
  }

  setLoadType(type: 'lazy' | 'eager'): this {
    this.loadType = type

    return this
  }
}
