/// <reference path="../definitions/data/IDataReader.ts" />

import { pick } from 'lodash'
import { Record } from './Record'

export const RecordDataReader: NajsEloquent.Data.IDataReader<Record> = {
  getAttribute(data: Record, field: string) {
    return data.getAttribute(field)
  },

  pick(record: Record, selectedFields: string[]): Record {
    const data = record.toObject()

    return new Record(pick(data, selectedFields))
  }
}
