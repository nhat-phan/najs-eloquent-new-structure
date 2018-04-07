/// <reference path="../../../dist/lib/index.d.ts" />
/// <reference path="../../custom.d.ts" />
import 'jest'

describe('NajsEloquent', function() {
  it('should work', function() {
    // console.log(NajsEloquent.classes)
    const x: NajsEloquent.Model.IModel<any, any> = <any>{ customMethod() {} }
    x.customMethod()
  })
})
