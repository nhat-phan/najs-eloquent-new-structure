/// <reference path="./IManyToManyDefinition.ts" />

namespace NajsEloquent.Relation {
  export interface IManyToManyRelationship<T> extends IManyToManyDefinition<T> {
    /**
     * Attach an model to relation with model's id.
     *
     * @param {string} id
     */
    attach(id: string): Promise<this>
    /**
     * Attach an model to relation with model's id and custom pivot data
     *
     * @param {string} id
     * @param {object} pivotData
     */
    attach(id: string, pivotData: object): Promise<this>
    /**
     * Attach models to relation with models' id.
     *
     * @param {string} ids
     */
    attach(ids: string[]): Promise<this>
    /**
     * Attach models to relation with models' id.
     *
     * @param {string} ids
     */
    attach(ids: string[], pivotData: object): Promise<this>
    /**
     * Attach models to relation with model id in key and pivot data is value
     *
     * @param {string} data, format:
     *   {
     *     [model id]: { pivot data...},
     *     ...
     *   }
     */
    attach(data: { [key in string]: object }): Promise<this>

    // /**
    //  * Detach an model to relation with model's id.
    //  *
    //  * @param {string} id
    //  */
    // detach(id: string): Promise<this>
    // /**
    //  * Detach models to relation with models' id.
    //  *
    //  * @param {string} ids
    //  */
    // detach(ids: string[]): Promise<this>

    // /**
    //  * Sync models to relation with model id in key and pivot data is value
    //  *
    //  * @param {string} data, format:
    //  *   {
    //  *     [model id]: { pivot data...},
    //  *     ...
    //  *   }
    //  */
    // sync(ids: string[], detaching: boolean): Promise<this>
    // /**
    //  * Sync models to relation with model id in key and pivot data is value
    //  *
    //  * @param {string} data, format:
    //  *   {
    //  *     [model id]: { pivot data...},
    //  *     ...
    //  *   }
    //  */
    // sync(data: object, detaching: boolean): Promise<this>
  }
}
