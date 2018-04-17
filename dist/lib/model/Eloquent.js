"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const ClassSetting_1 = require("../util/ClassSetting");
const DynamicAttribute_1 = require("./components/DynamicAttribute");
const EloquentComponentProviderFacade_1 = require("../facades/global/EloquentComponentProviderFacade");
class Eloquent extends Model_1.Model {
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     */
    constructor(data) {
        super(data);
        if (data !== ClassSetting_1.CREATE_SAMPLE) {
            EloquentComponentProviderFacade_1.EloquentComponentProvider.extend(this, Eloquent.prototype, this['driver']);
        }
    }
    getAttribute(key) {
        return super.getAttribute(key);
    }
}
exports.Eloquent = Eloquent;
EloquentComponentProviderFacade_1.EloquentComponentProvider.register(DynamicAttribute_1.DynamicAttribute, 'dynamic-attribute', true);
