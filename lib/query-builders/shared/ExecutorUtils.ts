import { make } from 'najs-binding'
import { QueryBuilderHandlerBase } from '../QueryBuilderHandlerBase'
import { MongodbConditionConverter } from './MongodbConditionConverter'

export class ExecutorUtils {
  static addSoftDeleteConditionIfNeeded(handler: QueryBuilderHandlerBase) {
    if (handler.shouldAddSoftDeleteCondition()) {
      const settings = handler.getSoftDeletesSetting()
      handler.getConditionQuery().whereNull(settings.deletedAt)
      handler.markSoftDeleteState('added')
    }
  }

  static convertConditionsToMongodbQuery(conditions: object[]): object {
    return make<MongodbConditionConverter>(MongodbConditionConverter.className, [conditions]).convert()
  }
}
