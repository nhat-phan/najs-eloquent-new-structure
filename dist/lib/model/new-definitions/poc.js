/// <reference path="poc.d.ts" />
class Model {
    newQuery() {
        return new QueryBuilder();
    }
}
class QueryBuilder {
    where() {
        return this;
    }
    async get() {
        return {};
    }
}
class KnexQueryBuilder extends QueryBuilder {
    join() {
        return this;
    }
}
class KnexModel extends Model {
    newQuery() {
        return super.newQuery();
    }
}
class User extends KnexModel {
}
async function run() {
    const user = new User();
    const result = await user
        .newQuery()
        .join()
        .get();
    console.log(result.name);
}
