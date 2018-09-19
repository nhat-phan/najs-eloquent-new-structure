/// <reference path="../contracts/MemoryDataSource.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource

import { pick, eq, lt } from 'lodash'
import { Record } from './Record'
import { RecordConditionMatcher } from './RecordConditionMatcher'

export type RecordConditions =
  | { $and: Array<RecordConditionMatcher | RecordConditions> }
  | { $or: Array<RecordConditionMatcher | RecordConditions> }
  | {}

export class RecordCollector {
  protected dataSource: MemoryDataSource<Record>
  protected limited?: number
  protected sortedBy?: Array<[string, string]>
  protected selected?: string[]
  protected conditions: RecordConditions

  protected constructor(dataSource: MemoryDataSource<Record>) {
    this.dataSource = dataSource
    this.conditions = {}
  }

  static use(dataSource: MemoryDataSource<Record>) {
    return new RecordCollector(dataSource)
  }

  setLimit(value: number): this {
    this.limited = value

    return this
  }

  setSelectedFields(selectedFields: string[]): this {
    this.selected = selectedFields

    return this
  }

  setSortedData(directions: Array<[string, string]>): this {
    this.sortedBy = directions

    return this
  }

  setConditions(conditions: RecordConditions): this {
    this.conditions = conditions

    return this
  }

  pickFields(record: Record): Record {
    const data = record.toObject()

    return new Record(pick(data, this.selected!))
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

  exec(): Record[] {
    const filtered: Record[] = []
    const shouldSortResult = typeof this.sortedBy !== 'undefined' && this.sortedBy.length > 0
    const shouldPickFields = typeof this.selected !== 'undefined' && this.selected.length > 0

    for (const record of this.dataSource) {
      if (!this.isMatch(record, this.conditions)) {
        continue
      }

      // Edge cases which happens if there is no sortedBy data
      if (!shouldSortResult) {
        filtered.push(shouldPickFields ? this.pickFields(record) : record)

        // Edge case #1: the result is reach limited number the process should be stopped
        if (this.limited && filtered.length === this.limited) {
          return filtered
        }
        continue
      }

      // if there is a sorted data, always push the raw record
      filtered.push(record)
    }

    return shouldSortResult ? this.sortLimitAndSelectRecords(filtered) : filtered
  }

  sortLimitAndSelectRecords(records: Record[]) {
    let result = records.sort((a, b) => this.compare(a, b, 0))

    if (this.limited) {
      result = result.slice(0, this.limited)
    }

    if (typeof this.selected !== 'undefined') {
      return result.map(record => this.pickFields(record))
    }
    return result
  }

  compare(a: Record, b: Record, index: number): number {
    const key = this.sortedBy![index][0]
    const valueA = a.getAttribute(key)
    const valueB = b.getAttribute(key)

    const result = eq(valueA, valueB)
    if (result) {
      if (index > this.sortedBy!.length - 1) {
        return 0
      }
      return this.compare(a, b, index + 1)
    }

    const direction = this.sortedBy![index][1]
    const isLessThan = lt(valueA, valueB)
    if (isLessThan) {
      return direction === 'asc' ? -1 : 1
    }
    return direction === 'asc' ? 1 : -1
  }
}
