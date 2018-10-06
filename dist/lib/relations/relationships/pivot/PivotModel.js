"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const Model_1 = require("../../../model/Model");
class PivotModel extends Model_1.Model {
    /**
     * Make new Pivot Model type
     *
     * @param modelName
     */
    static make(modelName, className) {
        if (typeof className === 'undefined') {
            className = `NajsEloquent.Pivot.${modelName}`;
        }
        if (najs_binding_1.ClassRegistry.has(className)) {
            return najs_binding_1.ClassRegistry.findOrFail(className).instanceConstructor;
        }
        class ModelClass extends PivotModel {
            getClassName() {
                return className;
            }
            getModelName() {
                return modelName;
            }
        }
        najs_binding_1.register(ModelClass, className);
        return ModelClass;
    }
}
exports.PivotModel = PivotModel;
