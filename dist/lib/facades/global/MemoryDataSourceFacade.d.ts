/// <reference path="../../contracts/MemoryDataSource.d.ts" />
import '../../drivers/memory/MemoryDataSource';
import { Record } from '../../drivers/Record';
import { IFacade, IFacadeBase } from 'najs-facade';
export declare const MemoryDataSourceFacade: Najs.Contracts.Eloquent.MemoryDataSource<Record> & IFacade;
export declare const MemoryDataSource: Najs.Contracts.Eloquent.MemoryDataSource<Record> & IFacadeBase;
