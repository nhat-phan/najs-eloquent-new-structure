"use strict";
/// <reference path="../definitions/relations/IRelationData.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class RelationData {
    constructor(factory) {
        this.factory = factory;
        this.state = 'unload';
    }
    getFactory() {
        return this.factory;
    }
    isLoaded() {
        return this.state === 'loaded';
    }
    isBuilt() {
        return this.state === 'built';
    }
    markLoaded() {
        this.state = 'loaded';
        return this;
    }
    markBuilt() {
        this.state = 'built';
        return this;
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    getLoadType() {
        return this.loadType || 'unknown';
    }
    setLoadType(type) {
        this.loadType = type;
        return this;
    }
}
exports.RelationData = RelationData;
