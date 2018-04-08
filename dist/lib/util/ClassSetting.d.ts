import { IAutoload } from 'najs-binding';
export declare const CREATE_SAMPLE = "create-sample";
export declare class ClassSetting {
    protected model: Object;
    protected definition: Function;
    private constructor();
    read<T>(property: string, merger: (staticVersion?: T, memberVersion?: T) => T): T;
    static arrayUnique<T>(initializeValue: T[], defaultValue: T[]): any;
    /**
     * store ModelMetadata instance with "sample" model
     */
    protected static samples: Object;
    /**
     * get metadata of Model class
     */
    static of(model: IAutoload): ClassSetting;
    static of(model: IAutoload, cache: boolean): ClassSetting;
}
