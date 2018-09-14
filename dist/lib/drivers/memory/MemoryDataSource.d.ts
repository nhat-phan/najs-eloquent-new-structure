import { Record } from '../Record';
import { RecordDataSourceBase } from './RecordDataSourceBase';
export declare class MemoryDataSource extends RecordDataSourceBase {
    static className: string;
    getClassName(): string;
    getPrimaryKey(data: Record): string;
    read(): Promise<boolean>;
    write(): Promise<boolean>;
}
