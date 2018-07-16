import { QueryBuilderHandleBase } from './QueryBuilderHandleBase'

export class QueryBuilder<T extends QueryBuilderHandleBase = QueryBuilderHandleBase> {
  protected handler: T

  constructor(handler: T) {
    this.handler = handler
  }

  queryName(name: string): this {
    this.handler.setQueryName(name)

    return this
  }

  setLogGroup(group: string): this {
    this.handler.setLogGroup(group)

    return this
  }

  orderByAsc(field: string): this {
    this.handler.getBasicQuery().orderBy(field, 'asc')
    this.handler.markUsed()

    return this
  }

  orderByDesc(field: string): this {
    this.handler.getBasicQuery().orderBy(field, 'desc')
    this.handler.markUsed()

    return this
  }
}
