/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/IRelationFeature.d.ts" />
import { FeatureBase } from './FeatureBase';
export declare class RelationFeature extends FeatureBase implements NajsEloquent.Feature.IRelationFeature {
    getPublicApi(): object;
    getFeatureName(): string;
    getClassName(): string;
    makeDataBucket(model: NajsEloquent.Model.IModel): NajsEloquent.Relation.IRelationDataBucket;
    getDataBucket(model: NajsEloquent.Model.IModel): NajsEloquent.Relation.IRelationDataBucket | undefined;
    setDataBucket(model: NajsEloquent.Model.IModel, dataBucket: NajsEloquent.Relation.IRelationDataBucket): void;
    createKeyForDataBucket(model: NajsEloquent.Model.IModel): string;
}
