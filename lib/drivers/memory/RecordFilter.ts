import { Record } from '../Record'
import { RecordConditionMatcher } from './RecordConditionMatcher'

export type RecordBucket = { [id in string]: Record }
export type RecordConditions = {
  $and?: RecordConditionMatcher[] | RecordConditions
  $or?: RecordConditionMatcher[] | RecordConditions
}

export class RecordFilter {
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
    if (typeof conditions['$or'] !== undefined) {
      // TODO: here
    }

    if (typeof conditions['$and'] !== undefined) {
      // TODO: here
    }

    return false
  }

  matchConditionsWithOrOperator(record: Record, conditions: RecordConditions): boolean {
    if (!Array.isArray(conditions)) {
      return this.isMatch(record, conditions)
    }

    for (const matcher of conditions) {
      if (matcher instanceof RecordConditionMatcher && matcher.isMatch(record)) {
        return true
      }
    }
    return false
  }

  matchConditionsWithAndOperator(record: Record, conditions: RecordConditions): boolean {
    if (!Array.isArray(conditions)) {
      return this.isMatch(record, conditions)
    }

    for (const matcher of conditions) {
      if (matcher instanceof RecordConditionMatcher && !matcher.isMatch(record)) {
        return false
      }
    }
    return true
  }
}
