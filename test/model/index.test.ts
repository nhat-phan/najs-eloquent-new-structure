import 'jest'
import '../../lib'

class Driver {
  proxy: boolean

  make(model: Model) {
    if (this.proxy) {
      return new Proxy(model, {
        get(target: any, key: any) {
          console.log('use proxy', key)
          return target[key]
        }
      })
    }

    return model
  }

  setProxy(proxy: boolean) {
    this.proxy = proxy
  }
}

const driver = new Driver()

class Model {
  protected driver: any

  constructor() {
    this.driver = driver
    return driver.make(this)
  }
}

describe('Test', function() {
  it('should works', function() {
    const a = new Model()
    console.log(a)
    console.log(a['driver'] === driver)
    console.log(a instanceof Model)

    driver.setProxy(true)
    const b = new Model()
    console.log(b['test'])
    console.log(b instanceof Model)
  })
})
