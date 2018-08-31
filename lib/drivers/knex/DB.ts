import { IKnexBasicQuery } from './definitions/IKnexBasicQuery'
// import { KnexProvider } from '../../facades/global/KnexProviderFacade'

export interface DB extends IKnexBasicQuery {}
export const DB: DB = {} as any

DB.limit(12).select()
// .where(KnexProvider.create().raw('SELECT * as test'))
