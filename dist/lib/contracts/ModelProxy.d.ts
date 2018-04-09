declare namespace Najs.Contracts.Eloquent {
    interface ModelProxy {
        proxify(target: Object, driver: Driver<any>): any;
        getProxies(): ModelComponent[];
        getProxies(model: string): ModelComponent[];
        register(proxy: ModelProxy, name: string, isDefault: boolean): this;
        bind(model: string, proxyName: string): this;
    }
}