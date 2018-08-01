"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const MongodbConditionConverter_1 = require("./MongodbConditionConverter");
class ExecutorUtils {
    static addSoftDeleteConditionIfNeeded(handler) {
        if (handler.shouldAddSoftDeleteCondition()) {
            const settings = handler.getSoftDeletesSetting();
            handler.getConditionQuery().whereNull(settings.deletedAt);
            handler.markSoftDeleteState('added');
        }
    }
    static convertConditionsToMongodbQuery(conditions) {
        return najs_binding_1.make(MongodbConditionConverter_1.MongodbConditionConverter.className, [conditions]).convert();
    }
}
exports.ExecutorUtils = ExecutorUtils;
