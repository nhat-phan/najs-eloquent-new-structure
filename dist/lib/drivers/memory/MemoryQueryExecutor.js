"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const najs_binding_1 = require("najs-binding");
const RecordConditionMatcherFactory_1 = require("../RecordConditionMatcherFactory");
const BasicQueryConverter_1 = require("../../query-builders/shared/BasicQueryConverter");
const ExecutorBase_1 = require("../ExecutorBase");
const ExecutorUtils_1 = require("../../query-builders/shared/ExecutorUtils");
const RecordCollector_1 = require("../RecordCollector");
class MemoryQueryExecutor extends ExecutorBase_1.ExecutorBase {
    constructor(queryHandler, dataSource, logger) {
        super();
        this.queryHandler = queryHandler;
        this.dataSource = dataSource;
        this.basicQuery = queryHandler.getBasicQuery();
        this.logger = logger.name(this.queryHandler.getQueryName());
    }
    async get() {
        const collector = this.makeCollector();
        const result = this.shouldExecute() ? await this.collectResult(collector) : [];
        return this.logger
            .raw('.exec()')
            .action('get')
            .end(result);
    }
    async first() {
        const collector = this.makeCollector().limit(1);
        const result = this.shouldExecute() ? await this.collectResult(collector) : undefined;
        this.logger
            .raw('.limit(1).exec()')
            .action('first')
            .end(result ? result[0] : undefined);
        return result && result.length > 0 ? result[0] : undefined;
    }
    async collectResult(collector) {
        await this.dataSource.read();
        return collector.exec();
    }
    makeCollector() {
        const collector = RecordCollector_1.RecordCollector.use(this.dataSource);
        this.logger
            .dataSource(this.dataSource)
            .raw(`RecordCollector.use(MemoryDataSourceProvider.create("${this.queryHandler.getModel().getModelName()}"))`);
        const limit = this.basicQuery.getLimit();
        if (limit) {
            collector.limit(limit);
            this.logger.queryBuilderData('limit', limit).raw('.limit(', limit, ')');
        }
        const ordering = Array.from(this.basicQuery.getOrdering().entries());
        if (ordering && ordering.length > 0) {
            collector.orderBy(ordering);
            this.logger.queryBuilderData('ordering', ordering).raw('.orderBy(', JSON.stringify(ordering), ')');
        }
        const selected = this.basicQuery.getSelect();
        if (!lodash_1.isEmpty(selected)) {
            collector.select(selected);
            this.logger.queryBuilderData('select', selected).raw('.select(', selected, ')');
        }
        const conditions = this.getFilterConditions();
        if (!lodash_1.isEmpty(conditions)) {
            collector.filterBy(conditions);
            this.logger.queryBuilderData('conditions', this.basicQuery.getRawConditions()).raw('.filterBy(', conditions, ')');
        }
        return collector;
    }
    getFilterConditions() {
        ExecutorUtils_1.ExecutorUtils.addSoftDeleteConditionIfNeeded(this.queryHandler);
        const converter = new BasicQueryConverter_1.BasicQueryConverter(this.basicQuery, najs_binding_1.make(RecordConditionMatcherFactory_1.RecordConditionMatcherFactory.className));
        return converter.getConvertedQuery();
    }
}
exports.MemoryQueryExecutor = MemoryQueryExecutor;
