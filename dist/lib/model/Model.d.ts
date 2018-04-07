/// <reference path="interfaces/IModel.d.ts" />
/// <reference path="interfaces/IModelQuery.d.ts" />
export interface IEloquent<A> {
    new (): NajsEloquent.Model.IModel<A> & NajsEloquent.Model.IModelQuery<A> & A;
}
export declare const Model: IEloquent<any>;
