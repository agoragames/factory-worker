Factory = require('../')
TestModel = function TestModel(attributes) {
  this.name = attributes.name;
  this.real = attributes.real;
}
TestModel.prototype.save = function(callback) {
  callback(null)
}
