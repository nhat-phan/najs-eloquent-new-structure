"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const FeatureBase_1 = require("./FeatureBase");
const SerializationPublicApi_1 = require("./mixin/SerializationPublicApi");
const constants_1 = require("../constants");
const helpers_1 = require("../util/helpers");
class SerializationFeature extends FeatureBase_1.FeatureBase {
    getPublicApi() {
        return SerializationPublicApi_1.SerializationPublicApi;
    }
    getFeatureName() {
        return 'Serialization';
    }
    getClassName() {
        return constants_1.NajsEloquent.Feature.SerializationFeature;
    }
    getVisible(model) {
        return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'visible', []);
    }
    getHidden(model) {
        return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'hidden', []);
    }
    markVisible(model, keys) {
        return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'visible', keys);
    }
    markHidden(model, keys) {
        return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'hidden', keys);
    }
    isVisible(model, keys) {
        return this.useSettingFeatureOf(model).isInWhiteList(model, keys, this.getVisible(model), this.getHidden(model));
    }
    isHidden(model, keys) {
        return this.useSettingFeatureOf(model).isInBlackList(model, keys, this.getHidden(model));
    }
    attributesToObject(model, shouldApplyVisibleAndHidden = true) {
        const data = this.useRecordManagerOf(model).toObject(model);
        return shouldApplyVisibleAndHidden ? this.applyVisibleAndHiddenFor(model, data) : data;
    }
    relationDataToObject(model, data, chains, relationName, formatName) {
        if (helpers_1.isModel(data)) {
            return this.useSerializationFeatureOf(data).toObject(data, chains, formatName);
        }
        if (helpers_1.isCollection(data)) {
            return data
                .map((nextModel) => {
                return this.useSerializationFeatureOf(nextModel).toObject(nextModel, chains, formatName);
            })
                .all();
        }
        return this.useRelationFeatureOf(model).getEmptyValueForSerializedRelation(model, relationName);
    }
    relationsToObject(model, names, formatName, shouldApplyVisibleAndHidden = true) {
        const relations = typeof names === 'undefined' ? model.getLoadedRelations() : model.getRelations(names);
        const data = relations.reduce((memo, relation) => {
            const relationName = relation.getName();
            const name = formatName ? model.formatAttributeName(relationName) : relationName;
            memo[name] = this.relationDataToObject(model, relation.getData(), relation.getChains(), relationName, formatName);
            return memo;
        }, {});
        return shouldApplyVisibleAndHidden ? this.applyVisibleAndHiddenFor(model, data) : data;
    }
    applyVisibleAndHiddenFor(model, data) {
        const visible = this.getVisible(model), hidden = this.getHidden(model);
        const settingFeature = this.useSettingFeatureOf(model);
        return Object.getOwnPropertyNames(data).reduce((memo, name) => {
            if (settingFeature.isKeyInWhiteList(model, name, visible, hidden)) {
                memo[name] = data[name];
            }
            return memo;
        }, {});
    }
    toObject(model, relations, formatName) {
        const data = Object.assign({}, this.attributesToObject(model, false), this.relationsToObject(model, relations, formatName, false));
        return this.applyVisibleAndHiddenFor(model, data);
    }
    toJson(model, replacer, space) {
        return JSON.stringify(this.toObject(model, undefined, true), replacer, space);
    }
}
exports.SerializationFeature = SerializationFeature;
najs_binding_1.register(SerializationFeature, 'NajsEloquent.Feature.SerializationFeature');
