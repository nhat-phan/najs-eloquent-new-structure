import '../../drivers/knex/wrappers/KnexWrapper'
import { KnexWrapper } from '../../drivers/knex/wrappers/KnexWrapper'
import { make } from 'najs-binding'
import { Facade, IFacade, IFacadeBase } from 'najs-facade'
import { container } from '../container'
import { NajsEloquent } from '../../constants'

const facade = Facade.create<KnexWrapper>(container, 'DB', function() {
  return make<KnexWrapper>(NajsEloquent.Driver.Knex.KnexWrapper)
})

export const DBFacade: KnexWrapper & IFacade = facade
export const DB: KnexWrapper & IFacadeBase = facade
