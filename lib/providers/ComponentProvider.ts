/// <reference path="../contracts/ComponentProvider.ts" />

import { make, register, getClassName } from 'najs-binding'
import { NajsEloquent } from '../constants'

export class ComponentProvider implements Najs.Contracts.Eloquent.ComponentProvider {
  static className: string = NajsEloquent.Provider.ComponentProvider

  protected components: {
    [key: string]: {
      className: string
      index: number
      isDefault: boolean
    }
  } = {}

  protected binding: {
    [key: string]: string[]
  } = {}

  protected extended: {
    [key: string]: string[]
  } = {}

  getClassName() {
    return NajsEloquent.Provider.ComponentProvider
  }

  extend(model: Najs.Contracts.Autoload, driver: Najs.Contracts.Eloquent.Driver<any>): any {
    const prototype = Object.getPrototypeOf(model)
    const components = this.resolveComponents(model, driver)
    for (const component of components) {
      if (typeof this.extended[model.getClassName()] === 'undefined') {
        this.extended[model.getClassName()] = []
      }

      if (this.extended[model.getClassName()].indexOf(component.getClassName()) !== -1) {
        continue
      }
      this.extended[model.getClassName()].push(component.getClassName())
      component.extend(prototype)
    }
  }

  private resolveComponents(
    model: Najs.Contracts.Autoload,
    driver: Najs.Contracts.Eloquent.Driver<any>
  ): Najs.Contracts.Eloquent.Component[] {
    const modelComponents = this.getComponents(model.getClassName())
    const driverComponents = driver.getModelComponentName()
    const combinedComponents = modelComponents.concat(driverComponents ? [driverComponents] : [])
    return driver.getModelComponentOrder(combinedComponents).map((name: string) => {
      return this.resolve(name)
    })
  }

  getComponents(model?: string): string[] {
    const defaultComponents = Object.keys(this.components).filter((name: string) => {
      return this.components[name].isDefault
    })
    const components: string[] = model ? defaultComponents.concat(this.binding[model] || []) : defaultComponents
    return components.sort((a: string, b: string) => {
      return this.components[a].index - this.components[b].index
    })
  }

  resolve(component: string): Najs.Contracts.Eloquent.Component {
    if (typeof this.components[component] === 'undefined') {
      throw new ReferenceError('Component "' + component + '" is not found.')
    }
    return make(this.components[component].className)
  }

  register(component: string | Function, name: string, isDefault: boolean = false): this {
    if (typeof component === 'function') {
      register(component)
    }
    const count = Object.keys(this.components).length
    this.components[name] = {
      className: getClassName(component),
      isDefault: isDefault,
      index: count
    }
    return this
  }

  bind(model: string, component: string): this {
    if (typeof this.binding[model] === 'undefined') {
      this.binding[model] = []
    }
    this.binding[model].push(component)
    this.binding[model] = Array.from(new Set(this.binding[model]))
    return this
  }
}
register(ComponentProvider)