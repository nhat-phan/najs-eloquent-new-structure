import IBasicConditionQuery = NajsEloquent.QueryGrammar.IBasicConditionQuery
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery
import IConvention = NajsEloquent.QueryBuilder.IConvention

namespace NajsEloquent.QueryBuilder {
  export interface IConditionQueryHandle<
    Base extends IBasicConditionQuery = IBasicConditionQuery,
    Convention extends IConvention = IConvention
  > extends IConditionQuery {
    basicConditionQuery: Base

    convention: Convention
  }
}
