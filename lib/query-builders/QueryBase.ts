/// <reference path="../definitions/query-builders/IConvention.ts" />
import IConvention = NajsEloquent.QueryBuilder.IConvention

export abstract class QueryBase {
  static DefaultConvention: IConvention = {
    formatFieldName(name: any) {
      return name
    },
    getNullValueFor(name: any) {
      // tslint:disable-next-line
      return null
    }
  }

  protected name: string
  protected logGroup: string
  protected primaryKeyName: string
  protected convention: IConvention

  constructor(primaryKeyName?: string) {
    this.primaryKeyName = primaryKeyName || 'id'
    this.convention = this.getQueryConvention()
  }

  abstract orderBy(field: string, direction?: string): this

  protected getQueryConvention(): IConvention {
    return QueryBase.DefaultConvention
  }

  queryName(name: string): this {
    this.name = name

    return this
  }

  setLogGroup(group: string): this {
    this.logGroup = group

    return this
  }

  getPrimaryKeyName(): string {
    return this.convention.formatFieldName(this.primaryKeyName)
  }
}
