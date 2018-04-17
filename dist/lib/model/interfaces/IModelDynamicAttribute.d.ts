declare namespace NajsEloquent.Model {
    class IModelDynamicAttribute {
        /**
         * Contains list of known attributes, included Eloquent members and current class members
         */
        protected knownAttributes: string[];
        /**
         * Contains dynamic attributes (AKA accessors and mutators)
         */
        protected dynamicAttributes: {
            [key: string]: {
                name: string;
                getter: boolean;
                setter: boolean;
                accessor?: string;
                mutator?: string;
            };
        };
    }
    interface IModelDynamicAttribute {
        /**
         * Determine give key is exists in Model or not.
         *
         * Note: if the given key is function name which exists in model it will returns true
         *
         * @param {string} key
         */
        hasAttribute(key: string): boolean;
    }
}
