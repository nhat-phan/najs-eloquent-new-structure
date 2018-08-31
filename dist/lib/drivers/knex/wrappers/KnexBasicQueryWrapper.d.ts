import { IKnexBasicQuery } from '../definitions/IKnexBasicQuery';
import { KnexQueryBuilderWrapperBase } from './KnexQueryBuilderWrapperBase';
export declare class KnexBasicQueryWrapper extends KnexQueryBuilderWrapperBase implements IKnexBasicQuery {
    select(): this;
    limit(record: number): this;
    orderBy(field: string, direction?: 'asc' | 'desc'): this;
}
