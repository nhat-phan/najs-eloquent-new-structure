"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const ClassSetting_1 = require("../util/ClassSetting");
const DynamicAttribute_1 = require("./components/DynamicAttribute");
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
            EloquentComponentProviderFacade_1.EloquentComponentProvider.extend(this, this['driver']);
        }
    }
}
exports.Eloquent = Eloquent;
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
//   const result = await test.select(['id', 'created_at']).orderBy('id').where('id', 1).first()
// }
// run()
