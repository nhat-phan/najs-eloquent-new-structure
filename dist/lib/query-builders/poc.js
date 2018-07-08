// interface IBasicConditionQuery {
//   where(): this
//   orWhere(): this
// }
// interface IConditionQuery extends IBasicConditionQuery {
//   whereNot(): this
//   whereNull(): this
// }
// interface IBasicQuery {
//   select(): this
//   orderBy(): this
// }
// interface IQuery extends IBasicQuery {
//   orderByAsc(): this
//   orderByDesc(): this
// }
// interface IQueryExecutor {
//   get(): any
//   first(): any
// }
// class QueryBuilderBase implements IQuery, IBasicConditionQuery {
//   select(): this {
//     return this
//   }
//   orderBy(): this {
//     return this
//   }
//   orderByAsc(): this {
//     return this
//   }
//   orderByDesc(): this {
//     return this
//   }
//   where(): this {
//     return this
//   }
//   orWhere(): this {
//     return this
//   }
// }
// class QueryCondition implements IBasicConditionQuery {
//   where(): this {
//     return this
//   }
//   orWhere(): this {
//     return this
//   }
// }
// class ConditionQueryHandle implements IConditionQuery {
//   protected basicConditionQuery: IBasicConditionQuery
//   constructor(basicConditionQuery: IBasicConditionQuery) {
//     this.basicConditionQuery = basicConditionQuery
//   }
//   where(): this {
//     this.basicConditionQuery.where()
//     return this
//   }
//   orWhere(): this {
//     this.basicConditionQuery.where()
//     return this
//   }
//   whereNot(): this {
//     return this
//   }
//   whereNull(): this {
//     return this
//   }
//   getBasicConditionQuery(): IBasicConditionQuery {
//     return this.basicConditionQuery
//   }
// }
// declare class IQueryHandle {
//   protected getQuery(): IQuery
//   protected getConditionalQuery(): IConditionQuery
//   // protected getQueryExecutor(): IQueryExecutor
// }
// interface IQueryHandle extends IQuery, IConditionQuery {}
// class QueryHandle implements IQueryHandle {
//   protected getQuery(): IQuery {
//     return <any>{}
//   }
//   protected getConditionalQuery(): IConditionQuery {
//     return new ConditionQueryHandle(new QueryBuilderBase())
//   }
//   orderBy() {
//     this.getQuery().orderBy()
//     return this
//   }
//   // protected getQueryExecutor(): IQueryExecutor {}
// }
