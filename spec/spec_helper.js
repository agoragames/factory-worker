Factory = require('../')
TestModel = function TestModel(attributes) {
  this.name = attributes.name;
  this.real = attributes.real;
  this.dynamic = attributes.dynamic;
  this.called = attributes.called;
}
TestModel.prototype.save = function(callback) {
  callback(null)
}
