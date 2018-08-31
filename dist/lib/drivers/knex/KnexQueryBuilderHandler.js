"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KnexBasicQueryWrapper_1 = require("./wrappers/KnexBasicQueryWrapper");
const QueryBuilderHandlerBase_1 = require("../../query-builders/QueryBuilderHandlerBase");
const KnexProviderFacade_1 = require("../../facades/global/KnexProviderFacade");
class KnexQueryBuilderHandler extends QueryBuilderHandlerBase_1.QueryBuilderHandlerBase {
    constructor(model) {
        super(model, {});
    }
    getTableName() {
        return this.model.getRecordName();
    }
    getConnectionName() {
        return this.model
            .getDriver()
            .getSettingFeature()
            .getSettingProperty(this.model, 'connection', 'default');
    }
    getKnexQueryBuilder() {
        if (!this.knexQuery) {
            this.knexQuery = KnexProviderFacade_1.KnexProvider.createQueryBuilder(this.getTableName(), this.getConnectionName());
        }
        return this.knexQuery;
    }
    getBasicQuery() {
        if (!this.basicQuery) {
            this.basicQuery = new KnexBasicQueryWrapper_1.KnexBasicQueryWrapper(this.getKnexQueryBuilder());
        }
        return this.basicQuery;
    }
    getConditionQuery() {
        return {};
    }
    getQueryConvention() {
        return {};
    }
}
exports.KnexQueryBuilderHandler = KnexQueryBuilderHandler;
