import { QueryLogBase, IQueryLogData } from './../QueryLogBase'

export interface IMongodbQueryLogData extends IQueryLogData {
  queryBuilderData: object
  query?: object
  options?: object
}

export class MongodbQueryLog extends QueryLogBase<IMongodbQueryLogData> {
  getDefaultData(): IMongodbQueryLogData {
    return {
      raw: '',
      queryBuilderData: {}
    }
  }

  queryBuilderData(key: string, value: any): this {
    this.data.queryBuilderData[key] = value
    return this
  }

  query(data: object): object {
    this.data.query = data

    return data
  }

  options(data: object | undefined): object | undefined {
    this.data.options = data

    return data
  }
}
