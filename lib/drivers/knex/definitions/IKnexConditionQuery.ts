import * as Knex from 'knex'

export interface IKnexConditionQuery {
  where(raw: Knex.Raw): this
}
