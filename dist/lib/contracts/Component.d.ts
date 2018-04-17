declare namespace Najs.Contracts.Eloquent {
    interface Component extends Najs.Contracts.Autoload {
        /**
         * Extend a prototype of current model class
         *
         * @param {Object} prototype model class prototype
         * @param {Object} eloquentPrototype Eloquent prototype
         */
        extend(prototype: Object, eloquentPrototype: Object): void;
    }
}
