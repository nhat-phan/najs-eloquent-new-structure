/// <reference path="IRelationFactory.ts" />

namespace NajsEloquent.Relation {
  export interface IRelationData<T> {
    getFactory(): IRelationFactory

    isLoaded(): boolean

    hasData(): boolean

    getData(): T | undefined | null

    setData(data: T | undefined | null): T | undefined | null

    getLoadType(): 'unknown' | 'lazy' | 'eager'

    setLoadType(type: 'lazy' | 'eager'): this
  }
}
