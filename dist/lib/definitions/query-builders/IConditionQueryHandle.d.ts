import IBasicConditionQuery = NajsEloquent.QueryGrammar.IBasicConditionQuery;
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery;
import IConvention = NajsEloquent.QueryBuilder.IConvention;
declare namespace NajsEloquent.QueryBuilder {
    interface IConditionQueryHandle<Base extends IBasicConditionQuery = IBasicConditionQuery, Convention extends IConvention = IConvention> extends IConditionQuery {
        basicConditionQuery: Base;
        convention: Convention;
    }
}
