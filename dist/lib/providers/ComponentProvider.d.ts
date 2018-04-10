/// <reference path="../contracts/ComponentProvider.d.ts" />
export declare class ComponentProvider implements Najs.Contracts.Eloquent.ComponentProvider {
    static className: string;
    protected components: {
        [key: string]: {
            className: string;
            index: number;
            isDefault: boolean;
        };
    };
    protected binding: {
        [key: string]: string[];
    };
    getClassName(): string;
    proxify(model: Najs.Contracts.Autoload, driver: Najs.Contracts.Eloquent.Driver<any>): any;
    getComponents(model?: string): string[];
    resolve(component: string, model: Najs.Contracts.Autoload, driver: Najs.Contracts.Eloquent.Driver<any>): Najs.Contracts.Eloquent.Component;
    register(component: string | Function, name: string, isDefault?: boolean): this;
    bind(model: string, component: string): this;
}
