"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
class RelationReference {
    constructor(root) {
        this.root = root;
    }
    getRootModel() {
        return this.root;
    }
    getRootKeyName() {
        return this.rootKeyName || this.root.getPrimaryKeyName();
    }
    getTargetModel() {
        if (!this.target) {
            this.target = najs_binding_1.make(this.targetName);
        }
        return this.target;
    }
    getInfo() {
        return {
            root: { model: this.root.getModelName() },
            target: { model: this.getTargetModel().getModelName() }
        };
    }
    getQuery() {
        return this.target.newQuery();
    }
    createQueryByRootPrimaryKey() { }
    createQueryByRootPrimaryKeys(ids) { }
    queryThrough() {
        // const Book: any = {}
        // const Author: any = {}
        // const pivotTable = Book.Pivot
        // Author.whereIn('id', pivotTable.select('author_id').whereIn('id', Book.ids))
        // class Book {
        //   authors: Author[]
        //   get authorsRelation() {
        //     const factory: any = {}
        //     return factory.define('authors').belongsToMany(Author)
        //   }
        // }
        // class Author {}
    }
}
exports.RelationReference = RelationReference;
