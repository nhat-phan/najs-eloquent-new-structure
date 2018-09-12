import { Record } from '../Record'
import { RecordConditionMatcher } from './RecordConditionMatcher'

import { register } from 'najs-binding'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'

export type RecordBucket = { [id in string]: Record }
export type RecordConditions =
  | { $and: Array<RecordConditionMatcher | RecordConditions> }
  | { $or: Array<RecordConditionMatcher | RecordConditions> }
  | {}

export class RecordFilter {
  static className: string = NajsEloquentClasses.Driver.Memory.RecordFilter

  getClassName() {
    return NajsEloquentClasses.Driver.Memory.RecordFilter
  }

  filter(records: Record[] | RecordBucket, conditions: RecordConditions): Record[] {
    if (Array.isArray(records)) {
      return records.filter(item => this.isMatch(item, conditions))
    }

    return Object.keys(records).reduce((result: Record[], id) => {
      if (this.isMatch(records[id], conditions)) {
        result.push(records[id])
      }
      return result
    }, [])
  }

  isMatch(record: Record, conditions: RecordConditions): boolean {
    if (typeof conditions['$or'] !== 'undefined') {
      return this.isMatchAtLeastOneCondition(record, conditions['$or'])
    }

    if (typeof conditions['$and'] !== 'undefined') {
      return this.isMatchAllConditions(record, conditions['$and'])
    }

    return false
  }

  isMatchAtLeastOneCondition(record: Record, conditions: Array<RecordConditionMatcher | RecordConditions>): boolean {
    for (const matcherOrSubConditions of conditions) {
      if (matcherOrSubConditions instanceof RecordConditionMatcher) {
        if (matcherOrSubConditions.isMatch(record)) {
          return true
        }
        continue
      }

      if (this.isMatch(record, matcherOrSubConditions)) {
        return true
      }
    }
    return false
  }

  isMatchAllConditions(record: Record, conditions: Array<RecordConditionMatcher | RecordConditions>): boolean {
    for (const matcherOrSubConditions of conditions) {
      if (matcherOrSubConditions instanceof RecordConditionMatcher) {
        if (!matcherOrSubConditions.isMatch(record)) {
          return false
        }
        continue
      }

      if (!this.isMatch(record, matcherOrSubConditions)) {
        return false
      }
    }
    return true
  }
}
register(RecordFilter, NajsEloquentClasses.Driver.Memory.RecordFilter, true, true)
