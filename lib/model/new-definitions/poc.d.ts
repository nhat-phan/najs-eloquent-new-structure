namespace POC {
  export interface IModel {
    newQuery(): QueryBuilder<this>
  }

  export interface IQueryBuilder<T> {
    where(): this

    get(): Promise<T>
  }
}
