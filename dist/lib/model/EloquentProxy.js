"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EloquentProxy = {
    shouldProxy(target, key) {
        return typeof key !== 'symbol' && target.knownAttributes.indexOf(key) === -1;
    },
    get(target, key) {
        if (this.shouldProxy(target, key)) {
            return target.driver.getAttribute(key);
        }
        return target[key];
    },
    set(target, key, value) {
        if (this.shouldProxy(target, key)) {
            return target.driver.setAttribute(key, value);
        }
        target[key] = value;
        return true;
    }
};
