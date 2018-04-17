"use strict";
/// <reference path="interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSetting_1 = require("../util/ClassSetting");
const najs_binding_1 = require("najs-binding");
const EloquentDriverProviderFacade_1 = require("../facades/global/EloquentDriverProviderFacade");
const Fillable_1 = require("./components/Fillable");
const Attribute_1 = require("./components/Attribute");
const Serialization_1 = require("./components/Serialization");
class Model {
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     */
    constructor(data) {
        const className = najs_binding_1.getClassName(this);
        if (!najs_binding_1.ClassRegistry.has(className)) {
            najs_binding_1.register(Object.getPrototypeOf(this).constructor, className);
        }
        if (data !== ClassSetting_1.CREATE_SAMPLE) {
            this['driver'] = EloquentDriverProviderFacade_1.EloquentDriverProvider.create(this);
            this['attributes'] = this['driver'].getRecord();
        }
    }
}
exports.Model = Model;
const defaultComponents = [new Attribute_1.Attribute(), new Fillable_1.Fillable(), new Serialization_1.Serialization()];
for (const component of defaultComponents) {
    component.extend(Model.prototype, [], {});
}
