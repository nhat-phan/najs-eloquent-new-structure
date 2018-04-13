function Eloquent(param) {
  this.variable = param
}

class Fillable {
  static getFillable() {
    console.log(this)
  }

  extends(prototype, constructor) {
    prototype.getFillable = Fillable.getFillable
  }
}

const fillable = new Fillable()
fillable.extends(Eloquent.prototype, Eloquent)

// --------------------------------------------------------

const eloquent = new Eloquent('test')
eloquent.fillable = 'test'
eloquent.getFillable()
