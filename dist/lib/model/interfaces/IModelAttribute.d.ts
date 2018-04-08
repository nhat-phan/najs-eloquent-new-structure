declare namespace NajsEloquent.Model {
    interface IModelAttribute {
        getAttribute(name: string): any;
        setAttribute(name: string): any;
    }
}
