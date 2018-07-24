import { QueryLog } from '../../facades/global/QueryLogFacade'
import { flatten } from 'lodash'

export class MongodbQueryLog {
  protected data: {
    raw: string
    queryBuilderData: object
    result?: any
    query?: object
    options?: object
    name?: string
    action?: string
  }

  constructor() {
    this.data = {
      raw: '',
      queryBuilderData: {}
    }
  }

  name(name: string): this {
    this.data.name = name
    return this
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

  action(action: string): this {
    this.data.action = action
    return this
  }

  raw(raw: any): this
  raw(...raw: any[]): this
  raw(...args: Array<any>): this {
    this.data.raw += flatten(args)
      .map(function(item) {
        if (typeof item === 'string') {
          return item
        }
        return JSON.stringify(item)
      })
      .join('')
    return this
  }

  end(result: any): any {
    this.data.result = result
    QueryLog.push(this.data)

    return result
  }
}
