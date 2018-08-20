"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../model/Model");
const Eloquent_1 = require("../model/Eloquent");
const Relation_1 = require("./Relation");
const EventPublicApi_1 = require("../features/mixin/EventPublicApi");
const FillablePublicApi_1 = require("../features/mixin/FillablePublicApi");
const RecordManagerPublicApi_1 = require("../features/mixin/RecordManagerPublicApi");
const RelationPublicApi_1 = require("../features/mixin/RelationPublicApi");
const SerializationPublicApi_1 = require("../features/mixin/SerializationPublicApi");
const SoftDeletesPublicApi_1 = require("../features/mixin/SoftDeletesPublicApi");
const TimestampsPublicApi_1 = require("../features/mixin/TimestampsPublicApi");
const PublicApiList = ['constructor', 'sharedMetadata'].concat(Object.getOwnPropertyNames(EventPublicApi_1.EventPublicApi), Object.getOwnPropertyNames(FillablePublicApi_1.FillablePublicApi), Object.getOwnPropertyNames(RecordManagerPublicApi_1.RecordManagerPublicApi), Object.getOwnPropertyNames(RelationPublicApi_1.RelationPublicApi), Object.getOwnPropertyNames(SerializationPublicApi_1.SerializationPublicApi), Object.getOwnPropertyNames(SoftDeletesPublicApi_1.SoftDeletesPublicApi), Object.getOwnPropertyNames(TimestampsPublicApi_1.TimestampsPublicApi));
class RelationDefinitionFinder {
    constructor(model, prototype, bases) {
        this.model = model;
        this.prototype = prototype;
        this.bases = bases;
    }
    getDefinitions() {
        return [this.prototype, ...this.bases]
            .map(prototype => {
            if (prototype === Eloquent_1.Eloquent.prototype || prototype === Model_1.Model.prototype || prototype === Object.prototype) {
                return {};
            }
            return this.findDefinitionsInPrototype(prototype);
        })
            .reduce((memo, definitions) => {
            const targets = Object.keys(definitions);
            if (targets.length === 0) {
                return memo;
            }
            for (const target of targets) {
                const definition = definitions[target];
                if (typeof memo[definition.accessor] !== 'undefined') {
                    this.warning(definition, memo[definition.accessor]);
                    continue;
                }
                memo[definition.accessor] = definition;
            }
            return memo;
        }, {});
    }
    findDefinitionsInPrototype(prototype) {
        const descriptors = Object.getOwnPropertyDescriptors(prototype);
        const className = typeof prototype['getClassName'] === 'function' ? prototype['getClassName']() : undefined;
        return Object.keys(descriptors).reduce((value, name) => {
            if (name === '' || PublicApiList.indexOf(name) !== -1) {
                return value;
            }
            const definition = this.findDefinition(name, descriptors[name], className);
            if (definition) {
                value[name] = definition;
            }
            return value;
        }, {});
    }
    findDefinition(target, descriptor, className) {
        try {
            if (typeof descriptor.value === 'function') {
                const relation = descriptor.value.call(this.model);
                if (relation instanceof Relation_1.Relation) {
                    return {
                        target: target,
                        accessor: relation.getName(),
                        targetType: 'function',
                        targetClass: className
                    };
                }
            }
            if (typeof descriptor.get === 'function') {
                const relation = descriptor.get.call(this.model);
                if (relation instanceof Relation_1.Relation) {
                    return {
                        accessor: relation.getName(),
                        target: target,
                        targetType: 'getter',
                        targetClass: className
                    };
                }
            }
        }
        catch (error) {
            // console.error(error)
        }
        return undefined;
    }
    warning(definition, definedDefinition) {
        console.warn(`The ${this.formatTargetName(definition)} redefines a relation on property`, `"${definition.accessor}"`, `which already defined by ${this.formatTargetName(definedDefinition)}`);
    }
    formatTargetName(definition) {
        const target = definition.targetType === 'function' ? `${definition.target}()` : `${definition.target}`;
        const className = !!definition.targetClass ? definition.targetClass + '.' : '';
        return `"${className + target}"`;
    }
}
exports.RelationDefinitionFinder = RelationDefinitionFinder;
