declare namespace NajsEloquent.Model {
    interface IModelSetting {
        settings: any;
        /**
         * Get ClassSetting instance of the model
         */
        getClassSetting(): any;
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
        /**
         * Determine that given key should be in white list and not in black list
         *
         * Note: it returns true if white list is empty and key not an attribute of model and not start with underscore.
         *
         * @param {string} key
         * @param {string[]} whiteList
         * @param {string[]} blackList
         */
        isInWhiteList(key: string, whiteList: string[], blackList: string[]): boolean;
        /**
         * Determine that given key is in the black list or not
         *
         * @param {string} key
         * @param {string[]} blackList
         */
        isInBlackList(key: string, blackList: string[]): boolean;
    }
}
