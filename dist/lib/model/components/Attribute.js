"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
class Attribute {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Attribute;
    }
    extend(prototype, bases, driver) {
        prototype['getAttribute'] = Attribute.getAttribute;
        prototype['setAttribute'] = Attribute.setAttribute;
        prototype['getPrimaryKey'] = Attribute.getPrimaryKey;
        prototype['setPrimaryKey'] = Attribute.setPrimaryKey;
        prototype['getPrimaryKeyName'] = Attribute.getPrimaryKeyName;
    }
    static getAttribute(key) {
        return this['driver'].getAttribute(key);
    }
    static setAttribute(key, value) {
        this['driver'].setAttribute(key, value);
        return this;
    }
    static getPrimaryKey() {
        return this['driver'].getAttribute(this.getPrimaryKeyName());
    }
    static setPrimaryKey(id) {
        this['driver'].setAttribute(this.getPrimaryKeyName(), id);
        return this;
    }
    static getPrimaryKeyName() {
        return this['driver'].getPrimaryKeyName();
    }
}
exports.Attribute = Attribute;
