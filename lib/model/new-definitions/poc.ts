/// <reference path="poc.d.ts" />

class Model implements POC.IModel {
  newQuery(): QueryBuilder<this> {
    return new QueryBuilder()
  }
}

interface QueryBuilder<T = any> extends POC.IQueryBuilder<T> {}
class QueryBuilder<T = any> implements POC.IQueryBuilder<T> {
  where() {
    return this
  }

  async get(): Promise<T> {
    return <any>{}
  }
}

class KnexQueryBuilder<T> extends QueryBuilder<T> {
  join(): this {
    return this
  }
}

interface KnexQuery {
  newQuery(): KnexQueryBuilder<this>
}
class KnexModel extends Model {
  newQuery(): KnexQueryBuilder<this> {
    return super.newQuery() as KnexQueryBuilder<this>
  }
}

class User extends KnexModel {
  name: string
}

async function run() {
  const user = new User()
  const result = await user
    .newQuery()
    .join()
    .get()
  console.log(result.name)
}
