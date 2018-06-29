export class RecordManager {
  // initialize(model: NajsEloquent.Model.IModel<Record>, isGuarded: boolean, data?: T | object): this {
  //   if (data instanceof Record) {
  //     model['attributes'] = data
  //     return this
  //   }
  //   if (typeof data === 'object') {
  //     if (isGuarded) {
  //       model['attributes'] = new Record()
  //       model.fill(data)
  //     } else {
  //       model['attributes'] = new Record(data as object)
  //     }
  //     return this
  //   }
  //   model['attributes'] = new Record()
  //   return this
  // }
  // getAttribute(model: NajsEloquent.Model.IModel<Record>, key: string): any {
  //   return (model['attributes'] as Record).getAttribute(key)
  // }
  // setAttribute<T>(model: NajsEloquent.Model.IModel<Record>, key: string, value: T): boolean {
  //   return model['attributes'].setAttribute(key, value)
  // }
  // hasAttribute(model: NajsEloquent.Model.IModel<Record>, key: string): boolean {
  //   return true
  // }
}
