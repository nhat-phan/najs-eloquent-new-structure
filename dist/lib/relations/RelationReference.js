"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
class RelationReference {
    constructor(root) {
        this.root = root;
    }
    getRootModel() {
        return this.root;
    }
    getTargetModel() {
        if (!this.target) {
            this.target = najs_binding_1.make(this.targetName);
        }
        return this.target;
    }
    getInfo() {
        return {
            root: { model: this.root.getModelName() },
            target: { model: this.getTargetModel().getModelName() }
        };
    }
    getQuery() {
        return this.target.newQuery();
    }
}
exports.RelationReference = RelationReference;
