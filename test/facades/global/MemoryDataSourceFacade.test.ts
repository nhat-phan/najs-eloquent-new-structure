import 'jest'
import '../../../lib/drivers/memory/MemoryDataSource'
import * as NajsBinding from 'najs-binding'
import * as Sinon from 'sinon'
import { NajsEloquent } from '../../../lib/constants'
import { MemoryDataSourceFacade } from '../../../lib/facades/global/MemoryDataSourceFacade'

describe('MemoryDataSource', function() {
  it('calls make() to create new instance of MemoryDataSource as a facade root', function() {
    const makeSpy = Sinon.spy(NajsBinding, 'make')
    MemoryDataSourceFacade.reloadFacadeRoot()
    expect(makeSpy.calledWith(NajsEloquent.Driver.Memory.MemoryDataSource)).toBe(true)
    expect(makeSpy.calledOnce).toBe(true)
  })
})
