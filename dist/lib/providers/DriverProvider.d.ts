/// <reference path="../contracts/DriverProvider.d.ts" />
import { Facade } from 'najs-facade';
import { IAutoload } from 'najs-binding';
export declare class DriverProvider extends Facade implements Najs.Contracts.Eloquent.DriverProvider {
    static className: string;
    protected drivers: {
        [key: string]: {
            driverClassName: string;
            isDefault: boolean;
        };
    };
    protected binding: {
        [key: string]: string;
    };
    getClassName(): string;
    protected findDefaultDriver(): string;
    protected createDriver<T>(model: IAutoload, driverClass: string, isGuarded: boolean): Najs.Contracts.Eloquent.Driver<T>;
    create<T extends Object = {}>(model: IAutoload, isGuarded?: boolean): Najs.Contracts.Eloquent.Driver<T>;
    findDriverClassName(model: IAutoload | string): string;
    register(driver: string | Function, name: string, isDefault?: boolean): this;
    bind(model: string, driver: string): this;
}
