import '../../drivers/knex/wrappers/KnexWrapper';
import { KnexWrapper } from '../../drivers/knex/wrappers/KnexWrapper';
import { IFacade, IFacadeBase } from 'najs-facade';
export declare const DBFacade: KnexWrapper & IFacade;
export declare const DB: KnexWrapper & IFacadeBase;
