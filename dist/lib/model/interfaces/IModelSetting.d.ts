declare namespace NajsEloquent.Model {
    interface IModelSetting {
        /**
         * Get the model setting which ensure result is always an unique array
         *
         * @param {string} property Property name
         * @param {string[]} defaultValue default value in case there is no setting
         */
        getArrayUniqueSetting(property: string, defaultValue: string[]): string[];
        /**
         * Push the args to setting in property, ensure the values are always unique
         * @param {string} property Property name
         * @param {Array<string|string[]} args arguments
         */
        pushToUniqueArraySetting(property: string, args: ArrayLike<any>): this;
    }
}
