/// <reference path="../../contracts/MemoryDataSource.ts" />

import '../../drivers/memory/MemoryDataSource'
import { Record } from '../../drivers/Record'
import { MemoryDataSource as MemoryDataSourceClass } from '../../drivers/memory/MemoryDataSource'
import { make } from 'najs-binding'
import { Facade, IFacade, IFacadeBase } from 'najs-facade'
import { container } from '../container'
import { NajsEloquent } from '../../constants'

const facade = Facade.create<MemoryDataSourceClass>(container, 'MemoryDataSource', function() {
  return make<MemoryDataSourceClass>(NajsEloquent.Driver.Memory.MemoryDataSource)
})

export const MemoryDataSourceFacade: Najs.Contracts.Eloquent.MemoryDataSource<Record> & IFacade = facade
export const MemoryDataSource: Najs.Contracts.Eloquent.MemoryDataSource<Record> & IFacadeBase = facade
