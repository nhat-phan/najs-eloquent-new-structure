"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const RelationBase_1 = require("./RelationBase");
class RelationDefinitionFinder {
    constructor(model, prototype, bases) {
        this.model = model;
        this.prototype = prototype;
        this.bases = bases;
    }
    getDefinitions() {
        return [this.prototype, ...this.bases]
            .map(prototype => {
            return this.findDefinitionsInPrototype(prototype);
        })
            .reduce((memo, definitions) => {
            const names = Object.keys(definitions);
            if (names.length === 0) {
                return memo;
            }
            for (const name in names) {
                if (typeof memo[name] === 'undefined') {
                    continue;
                }
                memo[name] = definitions[name];
            }
            return memo;
        }, {});
    }
    findDefinitionsInPrototype(prototype) {
        const descriptors = Object.getOwnPropertyDescriptors(prototype);
        return Object.keys(descriptors).reduce((value, name) => {
            if (name === 'constructor') {
                return value;
            }
            const definition = this.findDefinition(name, descriptors[name]);
            if (definition) {
                value[name] = definition;
            }
            return value;
        }, {});
    }
    findDefinition(target, descriptor) {
        try {
            if (typeof descriptor.value === 'function') {
                const relation = descriptor.value.call(this.model);
                if (relation instanceof RelationBase_1.RelationBase) {
                    return {
                        target: target,
                        accessor: relation.getName(),
                        targetType: 'function'
                    };
                }
            }
            if (typeof descriptor.get === 'function') {
                const relation = descriptor.value.call(this.model);
                if (relation instanceof RelationBase_1.RelationBase) {
                    return {
                        accessor: relation.getName(),
                        target: target,
                        targetType: 'getter'
                    };
                }
            }
        }
        catch (error) {
            // console.error(error)
        }
        return undefined;
    }
}
exports.RelationDefinitionFinder = RelationDefinitionFinder;
