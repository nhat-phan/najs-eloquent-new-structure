"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../model/Model");
const PrototypeManager_1 = require("../../util/PrototypeManager");
class KnexModel extends Model_1.Model {
    newQuery(name) {
        if (typeof name === 'string') {
            return super.newQuery(name);
        }
        const query = super.newQuery();
        return query.native(name);
    }
}
exports.KnexModel = KnexModel;
PrototypeManager_1.PrototypeManager.stopFindingRelationsIn(KnexModel.prototype);
// async function test() {
//   const model = new KnexModel()
//   model
//     .newQuery(function(queryBuilder) {
//       queryBuilder.select()
//     })
//     .firstOrFail('test')
//   // const result = await model.newQuery().get()
//   // result.first(function() {
//   //   return true
//   // })
// }
