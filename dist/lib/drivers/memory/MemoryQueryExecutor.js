"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const RecordConditionMatcherFactory_1 = require("../RecordConditionMatcherFactory");
const BasicQueryConverter_1 = require("../../query-builders/shared/BasicQueryConverter");
const ExecutorBase_1 = require("../ExecutorBase");
const ExecutorUtils_1 = require("../../query-builders/shared/ExecutorUtils");
const RecordFilter_1 = require("../RecordFilter");
// import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase'
class MemoryQueryExecutor extends ExecutorBase_1.ExecutorBase {
    constructor(queryHandler, dataSource, logger) {
        super();
        this.queryHandler = queryHandler;
        this.dataSource = dataSource;
        this.basicQuery = queryHandler.getBasicQuery();
        this.filter = najs_binding_1.make(RecordFilter_1.RecordFilter.className);
        this.logger = logger.name(this.queryHandler.getQueryName());
    }
    async get() {
        await this.dataSource.read();
        const conditions = this.getFilterConditions();
        if (this.shouldExecute()) {
            const records = this.dataSource.filter(item => this.filter.isMatch(item, conditions));
            return records;
        }
        return [];
        // const result = this.shouldExecute() ? await this.collection.find(query, options).toArray() : []
        // return this.logRaw(query, options, 'find')
        //   .raw('.toArray()')
        //   .action('get')
        //   .end(result)
    }
    getFilterConditions() {
        ExecutorUtils_1.ExecutorUtils.addSoftDeleteConditionIfNeeded(this.queryHandler);
        const converter = new BasicQueryConverter_1.BasicQueryConverter(this.basicQuery, najs_binding_1.make(RecordConditionMatcherFactory_1.RecordConditionMatcherFactory.className));
        return converter.getConvertedQuery();
        // return this.logger.queryBuilderData('conditions', this.basicQuery.getRawConditions())
        // .query(ExecutorUtils.convertConditionsToMongodbQuery(conditions))
    }
    logRaw(query, options, func) {
        return this.logger.raw('db.', `.${func}(`, query).raw(options ? ', ' : '', options, ')');
    }
}
exports.MemoryQueryExecutor = MemoryQueryExecutor;
