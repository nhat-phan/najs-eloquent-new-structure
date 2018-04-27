"use strict";
/// <reference path="interfaces/IModelQuery.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const Model_1 = require("./Model");
const ClassSetting_1 = require("../util/ClassSetting");
const DynamicAttribute_1 = require("./components/DynamicAttribute");
const ModelQuery_1 = require("./components/ModelQuery");
const EloquentProxy_1 = require("./EloquentProxy");
const EloquentComponentProviderFacade_1 = require("../facades/global/EloquentComponentProviderFacade");
class Eloquent extends Model_1.Model {
    /**
     * Model constructor.
     *
     * @param {Object|undefined} data
     */
    constructor(data) {
        super(data);
        if (data !== ClassSetting_1.CREATE_SAMPLE) {
            EloquentComponentProviderFacade_1.EloquentComponentProvider.extend(this, this.driver);
            if (this.driver.useEloquentProxy()) {
                return new Proxy(this, EloquentProxy_1.EloquentProxy);
            }
        }
    }
    static register(model) {
        najs_binding_1.register(model);
        Reflect.construct(model, []);
    }
}
exports.Eloquent = Eloquent;
const defaultComponents = [najs_binding_1.make(ModelQuery_1.ModelQuery.className)];
for (const component of defaultComponents) {
    component.extend(Eloquent.prototype, [], {});
}
EloquentComponentProviderFacade_1.EloquentComponentProvider.register(DynamicAttribute_1.DynamicAttribute, 'dynamic-attribute', true);
// async function run() {
//   interface IUser {
//     first_name: string
//     last_name: string
//   }
//   interface UserMethods {
//     doSomething(): void
//   }
//   class User extends Eloquent<IUser & UserMethods> implements UserMethods {
//     doSomething() {}
//   }
//   const test = new User()
//   const result = await test
//     .select(['id', 'created_at'])
//     .orderBy('id')
//     .where('id', 1)
//     .get()
// }
// run()
