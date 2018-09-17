import { QueryLogBase, IQueryLogData } from './../QueryLogBase'

export interface IMongodbQueryLogData extends IQueryLogData {
  query?: object
  options?: object
}

export class MongodbQueryLog extends QueryLogBase<IMongodbQueryLogData> {
  getDefaultData(): IMongodbQueryLogData {
    return this.getEmptyData()
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
