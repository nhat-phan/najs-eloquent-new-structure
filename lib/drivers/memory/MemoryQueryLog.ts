import { QueryLogBase, IQueryLogData } from '../QueryLogBase'

export class MemoryQueryLog extends QueryLogBase<IQueryLogData> {
  getDefaultData(): IQueryLogData {
    return this.getEmptyData()
  }
}
