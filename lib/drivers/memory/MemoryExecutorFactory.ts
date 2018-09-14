/// <reference path="../../definitions/driver/IExecutorFactory.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />

import IModel = NajsEloquent.Model.IModel
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler

import { register } from 'najs-binding'
import { Record } from '../Record'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { MemoryRecordExecutor } from './MemoryRecordExecutor'
import { MemoryQueryLog } from './MemoryQueryLog'

export class MemoryExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
  static className: string = NajsEloquentClasses.Driver.Memory.MemoryExecutorFactory

  makeRecordExecutor<T extends Record>(model: IModel, record: T): MemoryRecordExecutor {
    return {} as any
  }

  makeQueryExecutor(handler: IQueryBuilderHandler): any {
    return {} as any
  }

  getClassName() {
    return NajsEloquentClasses.Driver.Memory.MemoryExecutorFactory
  }

  makeLogger(): MemoryQueryLog {
    return new MemoryQueryLog()
  }
}
register(MemoryExecutorFactory, NajsEloquentClasses.Driver.Memory.MemoryExecutorFactory, true, true)
