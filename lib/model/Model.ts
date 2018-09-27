/// <reference path="../definitions/model/IModel.ts" />
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import SubCondition = NajsEloquent.QueryGrammar.SubCondition
import Range = NajsEloquent.QueryGrammar.Range

import { getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
import { PrototypeManager } from '../util/PrototypeManager'

export interface Model extends NajsEloquent.Model.IModel {}
export class Model {
  public id?: any

  constructor(data?: object, isGuarded?: boolean) {
    this.internalData = {
      relations: {}
    } as any

    return this.makeDriver().makeModel<any>(this, data, isGuarded)
  }

  protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T> {
    this.driver = EloquentDriverProvider.create(this)

    return this.driver
  }

  getDriver() {
    return this.driver
  }

  getModelName() {
    return getClassName(this)
  }

  newQuery(name?: string): IQueryBuilder<this> {
    const query = this.driver.getQueryFeature().newQuery(this)

    return typeof name !== 'undefined' ? query.queryName(name) : query
  }

  // static start query methods ----------------------------------------------------------------------------------------
  /**
   * Start new query of model.
   */
  static newQuery<T extends typeof Model>(this: T): IQueryBuilder<InstanceType<T>>
  /**
   * Start new query of model with name.
   */
  static newQuery<T extends typeof Model>(this: T, name: string): IQueryBuilder<InstanceType<T>>
  static newQuery<T extends typeof Model>(this: T, name?: string): IQueryBuilder<InstanceType<T>> {
    return (new this() as InstanceType<T>).newQuery(name)
  }

  /**
   * Set the query with given name
   *
   * @param {string} name
   */
  static queryName<T extends typeof Model>(this: T, name: string): IQueryBuilder<InstanceType<T>> {
    return this.newQuery(name)
  }

  /**
   * Set the query log group name
   *
   * @param {string} group QueryLog group
   */
  static setLogGroup<T extends typeof Model>(this: T, group: string): IQueryBuilder<InstanceType<T>> {
    const query = this.newQuery()
    return query.setLogGroup.apply(query, arguments)
  }

  /**
   * Set the columns or fields to be selected.
   *
   * @param {string|string[]} fields
   */
  static select<T extends typeof Model>(this: T, ...fields: Array<string | string[]>): IQueryBuilder<InstanceType<T>>
  static select() {
    const query = this.newQuery()
    return query.select.apply(query, arguments)
  }

  /**
   * Set the "limit" value of the query.
   * @param {number} records
   */
  static limit<T extends typeof Model>(this: T, record: number): IQueryBuilder<InstanceType<T>>
  static limit() {
    const query = this.newQuery()
    return query.limit.apply(query, arguments)
  }

  /**
   * Add an "order by" clause to the query.
   *
   * @param {string} field
   */
  static orderBy<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>
  /**
   * Add an "order by" clause to the query.
   *
   * @param {string} field
   * @param {string} direction
   */
  static orderBy<T extends typeof Model>(
    this: T,
    field: string,
    direction: 'asc' | 'desc'
  ): IQueryBuilder<InstanceType<T>>
  static orderBy() {
    const query = this.newQuery()
    return query.orderBy.apply(query, arguments)
  }

  /**
   * Add an "order by" clause to the query with direction ASC.
   *
   * @param {string} field
   * @param {string} direction
   */
  static orderByAsc<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>> {
    const query = this.newQuery()
    return query.orderByAsc.apply(query, arguments)
  }

  /**
   * Add an "order by" clause to the query with direction DESC.
   *
   * @param {string} field
   * @param {string} direction
   */
  static orderByDesc<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>> {
    const query = this.newQuery()
    return query.orderByDesc.apply(query, arguments)
  }

  /**
   * Consider all soft-deleted or not-deleted items.
   */
  static withTrashed<T extends typeof Model>(this: T): IQueryBuilder<InstanceType<T>> {
    const query = this.newQuery()
    return query.withTrashed.apply(query, arguments)
  }

  /**
   * Consider soft-deleted items only.
   */
  static onlyTrashed<T extends typeof Model>(this: T): IQueryBuilder<InstanceType<T>> {
    const query = this.newQuery()
    return query.onlyTrashed.apply(query, arguments)
  }

  /**
   * Add a basic where clause to the query.
   *
   * @param {Function} conditionBuilder sub-query builder
   */
  static where<T extends typeof Model>(this: T, conditionBuilder: SubCondition): IQueryBuilder<InstanceType<T>>
  /**
   * Add a basic where clause to the query.
   *
   * @param {string} field
   * @param {mixed} value
   */
  static where<T extends typeof Model>(this: T, field: string, value: any): IQueryBuilder<InstanceType<T>>
  /**
   * Add a basic where clause to the query.
   *
   * @param {string} field
   * @param {string} operator
   * @param {mixed} value
   */
  static where<T extends typeof Model>(
    this: T,
    field: string,
    operator: Operator,
    value: any
  ): IQueryBuilder<InstanceType<T>>
  static where<T extends typeof Model>(this: T): IQueryBuilder<InstanceType<T>> {
    const query = this.newQuery()
    return query.where.apply(query, arguments)
  }

  /**
   * Add a "where not" clause to the query.
   *
   * @param {string} field
   * @param {mixed} value
   */
  static whereNot<T extends typeof Model>(this: T, field: string, value: any): IQueryBuilder<InstanceType<T>>
  static whereNot(field: string, value: any) {
    const query = this.newQuery()
    return query.whereNot.apply(query, arguments)
  }

  /**
   * Add a "where in" clause to the query.
   *
   * @param {string} field
   * @param {any[]} values
   */
  static whereIn<T extends typeof Model>(this: T, field: string, values: Array<any>): IQueryBuilder<InstanceType<T>>
  static whereIn(field: string, values: Array<any>) {
    const query = this.newQuery()
    return query.whereIn.apply(query, arguments)
  }

  /**
   * Add a "where not in" clause to the query.
   *
   * @param {string} field
   * @param {any[]} values
   */
  static whereNotIn<T extends typeof Model>(this: T, field: string, values: Array<any>): IQueryBuilder<InstanceType<T>>
  static whereNotIn(field: string, values: Array<any>) {
    const query = this.newQuery()
    return query.whereNotIn.apply(query, arguments)
  }

  /**
   * Add a "where null" clause to the query.
   *
   * @param {string} field
   */
  static whereNull<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>
  static whereNull(field: string) {
    const query = this.newQuery()
    return query.whereNull.apply(query, arguments)
  }

  /**
   * Add a "where null" clause to the query.
   *
   * @param {string} field
   */
  static whereNotNull<T extends typeof Model>(this: T, field: string): IQueryBuilder<InstanceType<T>>
  static whereNotNull(field: string) {
    const query = this.newQuery()
    return query.whereNotNull.apply(query, arguments)
  }

  /**
   * Add a "where between" clause to the query.
   *
   * @param {string} field
   */
  static whereBetween<T extends typeof Model>(this: T, field: string, range: Range): IQueryBuilder<InstanceType<T>>
  static whereBetween(field: string, range: Range) {
    const query = this.newQuery()
    return query.whereBetween.apply(query, arguments)
  }

  /**
   * Add a "where not between" clause to the query.
   *
   * @param {string} field
   */
  static whereNotBetween<T extends typeof Model>(this: T, field: string, range: Range): IQueryBuilder<InstanceType<T>>
  static whereNotBetween(field: string, range: Range) {
    const query = this.newQuery()
    return query.whereNotBetween.apply(query, arguments)
  }
}

PrototypeManager.stopFindingRelationsIn(Model.prototype)
