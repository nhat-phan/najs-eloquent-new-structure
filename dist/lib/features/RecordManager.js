"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RecordManagerBase_1 = require("./RecordManagerBase");
const Record_1 = require("./Record");
class RecordManager extends RecordManagerBase_1.RecordManagerBase {
    initialize(model, isGuarded, data) {
        if (data instanceof Record_1.Record) {
            model['attributes'] = data;
            return;
        }
        if (typeof data !== 'object') {
            model['attributes'] = new Record_1.Record();
            return;
        }
        if (!isGuarded) {
            model['attributes'] = new Record_1.Record(data);
            return;
        }
        model['attributes'] = new Record_1.Record();
        model.fill(data);
    }
    getAttribute(model, key) {
        return model['attributes'].getAttribute(key);
    }
    setAttribute(model, key, value) {
        return model['attributes'].setAttribute(key, value);
    }
    hasAttribute(model, key) {
        return true;
    }
    getPrimaryKeyName(model) {
        return model
            .getDriver()
            .getSettingFeature()
            .getSettingProperty(model, 'primaryKey', 'id');
    }
    getClassName() {
        return 'RecordManager';
    }
}
exports.RecordManager = RecordManager;
