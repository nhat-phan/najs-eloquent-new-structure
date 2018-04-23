"use strict";
/// <reference path="interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const ClassSetting_1 = require("../util/ClassSetting");
const najs_binding_2 = require("najs-binding");
const EloquentDriverProviderFacade_1 = require("../facades/global/EloquentDriverProviderFacade");
const SettingType_1 = require("./../util/SettingType");
const ModelSetting_1 = require("./ModelSetting");
const ModelAttribute_1 = require("./components/ModelAttribute");
const ModelFillable_1 = require("./components/ModelFillable");
const ModelSerialization_1 = require("./components/ModelSerialization");
const collect = require('collect.js');
class Model {
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     */
    constructor(data) {
        const className = najs_binding_2.getClassName(this);
        if (!najs_binding_2.ClassRegistry.has(className)) {
            najs_binding_2.register(Object.getPrototypeOf(this).constructor, className);
        }
        if (data !== ClassSetting_1.CREATE_SAMPLE) {
            this.settings = new ModelSetting_1.ModelSetting(this);
            this.driver = EloquentDriverProviderFacade_1.EloquentDriverProvider.create(this);
            this.driver.initialize(data);
            this.attributes = this.driver.getRecord();
        }
    }
    // model: 3 functions
    // fillable: 8 functions
    // serialization: 9 functions
    // attribute: 5 functions
    // timestamps: 3 functions
    // soft delete: 5 functions
    newCollection(dataset) {
        return collect(dataset.map(item => this.newInstance(item)));
    }
    newInstance(data) {
        return najs_binding_1.make(najs_binding_2.getClassName(this), [data]);
    }
    getSetting() {
        if (!this.setting) {
            this.setting = ClassSetting_1.ClassSetting.of(this);
        }
        return this.setting;
    }
    getArrayUniqueSetting(property, defaultValue) {
        return this.getSetting().read(property, SettingType_1.SettingType.arrayUnique([], defaultValue));
    }
}
exports.Model = Model;
const defaultComponents = [
    najs_binding_1.make(ModelAttribute_1.ModelAttribute.className),
    najs_binding_1.make(ModelFillable_1.ModelFillable.className),
    najs_binding_1.make(ModelSerialization_1.ModelSerialization.className)
];
for (const component of defaultComponents) {
    component.extend(Model.prototype, [], {});
}
