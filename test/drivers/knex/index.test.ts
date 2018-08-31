import 'jest'
import { init_knex, knex_run_sql } from '../../util'
import { KnexProvider } from '../../../lib/facades/global/KnexProviderFacade'

describe('Knex.QueryBuilder', function() {
  beforeAll(async function() {
    await init_knex('knex_index')
    await knex_run_sql(
      `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        PRIMARY KEY (id)
      )`
    )
  })

  describe('.select()', function() {
    it('should work', function() {
      const query = KnexProvider.createQueryBuilder('users')
      console.log(
        query
          .select({ alias: 'column_name' })
          .orderBy('test', 'desc')
          .limit(10)
          .where('a', '>')
          .toQuery()
      )
    })
  })
})
