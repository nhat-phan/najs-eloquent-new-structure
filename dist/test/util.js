"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongodbProviderFacade_1 = require("../lib/facades/global/MongodbProviderFacade");
// import { KnexProviderFacade } from '../lib/facades/global/KnexProviderFacade'
// export function init_mongoose(mongoose: any, name: string): Promise<any> {
//   return new Promise(resolve => {
//     mongoose.connect('mongodb://localhost/najs_eloquent_test_' + name)
//     mongoose.Promise = global.Promise
//     mongoose.connection.once('open', () => {
//       resolve(true)
//     })
//   })
// }
// export function delete_collection(mongoose: any, collection: string): Promise<any> {
//   return new Promise(resolve => {
//     mongoose.connection.collection(collection).drop(resolve)
//   })
// }
function init_mongodb(name) {
    return MongodbProviderFacade_1.MongodbProviderFacade.connect('mongodb://localhost:27017/najs_eloquent_test_' + name);
}
exports.init_mongodb = init_mongodb;
function delete_collection_use_mongodb(name) {
    return MongodbProviderFacade_1.MongodbProviderFacade.getDatabase()
        .collection(name)
        .drop();
}
exports.delete_collection_use_mongodb = delete_collection_use_mongodb;
// export function init_knex(database: string): Promise<any> {
//   return new Promise(resolve => {
//     const connection = {
//       host: '127.0.0.1',
//       user: 'root',
//       password: ''
//     }
//     KnexProviderFacade.setDefaultConfig({
//       client: 'mysql',
//       connection: connection
//     })
//     const dropDatabaseSql = `DROP DATABASE IF EXISTS ${database}`
//     const createDatabaseSql = `CREATE DATABASE ${database} DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin`
//     const knex = KnexProviderFacade.create()
//     knex.raw(dropDatabaseSql).then(function(result) {
//       knex.raw(createDatabaseSql).then(function(result) {
//         connection['database'] = database
//         KnexProviderFacade.setDefaultConfig({
//           client: 'mysql',
//           connection: connection
//         })
//         resolve()
//       })
//     })
//   })
// }
// export function knex_run_sql(sql: string): Promise<any> {
//   return new Promise(resolve => {
//     KnexProviderFacade.create()
//       .raw(sql)
//       .then(resolve)
//   })
// }
