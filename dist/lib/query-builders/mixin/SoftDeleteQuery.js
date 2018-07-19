"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteQuery = {
    withTrashed() {
        if (this['handler'].hasSoftDeletes()) {
            this['handler'].markSoftDeleteState('should-not-add');
            this['handler'].markUsed();
        }
        return this;
    },
    onlyTrashed() {
        if (this['handler'].hasSoftDeletes()) {
            this['handler'].markSoftDeleteState('should-not-add');
            const model = this['handler'].getModel();
            const softDeletesFeature = model.getDriver().getSoftDeletesFeature();
            const softDeletesSetting = softDeletesFeature.getSoftDeletesSetting(model);
            this.whereNotNull(softDeletesSetting.deletedAt);
            this['handler'].markUsed();
        }
        return this;
    }
};
