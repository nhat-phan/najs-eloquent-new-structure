"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EloquentDriverProviderFacade_1 = require("../facades/global/EloquentDriverProviderFacade");
function bind_driver_if_needed(modelName, driverName, driverClass) {
    if (!EloquentDriverProviderFacade_1.EloquentDriverProvider.has(driverClass)) {
        EloquentDriverProviderFacade_1.EloquentDriverProvider.register(driverClass, driverName);
        EloquentDriverProviderFacade_1.EloquentDriverProvider.bind(modelName, driverName);
    }
}
exports.bind_driver_if_needed = bind_driver_if_needed;
