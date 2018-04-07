"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function in_array(key, ...args) {
    for (const array of args) {
        if (array.indexOf(key) !== -1) {
            return true;
        }
    }
    return false;
}
exports.in_array = in_array;
