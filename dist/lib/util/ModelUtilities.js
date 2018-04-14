"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ModelUtilities {
    static pushToUniqueArraySetting(model, key, args) {
        const setting = model[key] || [];
        model[key] = Array.from(new Set(setting.concat(lodash_1.flatten(args))));
        return model[key];
    }
}
exports.ModelUtilities = ModelUtilities;
