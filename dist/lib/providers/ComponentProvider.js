"use strict";
/// <reference path="../contracts/ComponentProvider.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
class ComponentProvider {
    constructor() {
        this.components = {};
        this.binding = {};
        this.extended = {};
    }
    getClassName() {
        return constants_1.NajsEloquent.Provider.ComponentProvider;
    }
    extend(model, driver) {
        const prototype = Object.getPrototypeOf(model);
        const components = this.resolveComponents(model, driver);
        for (const component of components) {
            if (typeof this.extended[model.getClassName()] === 'undefined') {
                this.extended[model.getClassName()] = [];
            }
            if (this.extended[model.getClassName()].indexOf(component.getClassName()) !== -1) {
                continue;
            }
            this.extended[model.getClassName()].push(component.getClassName());
            component.extend(prototype);
        }
    }
    resolveComponents(model, driver) {
        const modelComponents = this.getComponents(model.getClassName());
        const driverComponents = driver.getModelComponentName();
        const combinedComponents = modelComponents.concat(driverComponents ? [driverComponents] : []);
        return driver.getModelComponentOrder(combinedComponents).map((name) => {
            return this.resolve(name);
        });
    }
    getComponents(model) {
        const defaultComponents = Object.keys(this.components).filter((name) => {
            return this.components[name].isDefault;
        });
        const components = model ? defaultComponents.concat(this.binding[model] || []) : defaultComponents;
        return components.sort((a, b) => {
            return this.components[a].index - this.components[b].index;
        });
    }
    resolve(component) {
        if (typeof this.components[component] === 'undefined') {
            throw new ReferenceError('Component "' + component + '" is not found.');
        }
        return najs_binding_1.make(this.components[component].className);
    }
    register(component, name, isDefault = false) {
        if (typeof component === 'function') {
            najs_binding_1.register(component);
        }
        const count = Object.keys(this.components).length;
        this.components[name] = {
            className: najs_binding_1.getClassName(component),
            isDefault: isDefault,
            index: count
        };
        return this;
    }
    bind(model, component) {
        if (typeof this.binding[model] === 'undefined') {
            this.binding[model] = [];
        }
        this.binding[model].push(component);
        this.binding[model] = Array.from(new Set(this.binding[model]));
        return this;
    }
}
ComponentProvider.className = constants_1.NajsEloquent.Provider.ComponentProvider;
exports.ComponentProvider = ComponentProvider;
najs_binding_1.register(ComponentProvider);
