/// <reference path="../../contracts/MemoryDataSource.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource
import { Record } from '../Record'
import { QueryLogBase, IQueryLogData } from '../QueryLogBase'

export interface IMemoryLogData extends IQueryLogData {
  dataSource?: string
}

export class MemoryQueryLog extends QueryLogBase<IMemoryLogData> {
  getDefaultData(): IMemoryLogData {
    return this.getEmptyData()
  }

  dataSource(ds: MemoryDataSource<Record>): this {
    this.data.dataSource = ds.getClassName()

    return this
  }
}
