"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const util_1 = require("../../util");
const KnexProviderFacade_1 = require("../../../lib/facades/global/KnexProviderFacade");
describe('Knex.QueryBuilder', function () {
    beforeAll(async function () {
        await util_1.init_knex('knex_index');
        await util_1.knex_run_sql(`CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        PRIMARY KEY (id)
      )`);
    });
    describe('.select()', function () {
        it('should work', function () {
            const query = KnexProviderFacade_1.KnexProvider.createQueryBuilder('users');
            console.log(query
                .select({ alias: 'column_name' })
                .orderBy('test', 'desc')
                .limit(10)
                .where('a', '>')
                .toQuery());
            console.log(query.where('a', '0').toQuery());
        });
    });
});
