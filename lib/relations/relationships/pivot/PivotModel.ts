import { register, ClassRegistry } from 'najs-binding'
import { Model } from '../../../model/Model'
import { PrototypeManager } from '../../../util/PrototypeManager'

export class PivotModel extends Model {
  /**
   * Make new Pivot Model type
   *
   * @param modelName
   */
  static createPivotClass(modelName: string, className?: string): typeof PivotModel {
    if (typeof className === 'undefined') {
      className = `NajsEloquent.Pivot.${modelName}`
    }

    if (ClassRegistry.has(className)) {
      return ClassRegistry.findOrFail(className).instanceConstructor! as typeof PivotModel
    }

    class ModelClass extends PivotModel {
      getClassName() {
        return className
      }

      getModelName() {
        return modelName
      }
    }
    register(ModelClass, className)

    return ModelClass
  }
}
PrototypeManager.stopFindingRelationsIn(PivotModel)
