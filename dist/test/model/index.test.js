"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("../../lib");
class Driver {
    make(model) {
        if (this.proxy) {
            return new Proxy(model, {
                get(target, key) {
                    console.log('use proxy', key);
                    return target[key];
                }
            });
        }
        return model;
    }
    setProxy(proxy) {
        this.proxy = proxy;
    }
}
const driver = new Driver();
class Model {
    constructor() {
        this.driver = driver;
        return driver.make(this);
    }
}
describe('Test', function () {
    it('should works', function () {
        const a = new Model();
        console.log(a);
        console.log(a['driver'] === driver);
        console.log(a instanceof Model);
        driver.setProxy(true);
        const b = new Model();
        console.log(b['test']);
        console.log(b instanceof Model);
    });
});
