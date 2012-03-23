Factory = require('../')
TestModel = function TestModel(attributes) {
  this.isNew = true;
  this.name = attributes.name;
  this.real = attributes.real;
  this.dynamic = attributes.dynamic;
  this.called = attributes.called;
}
TestModel.prototype.save = function(callback) {
  this.isNew = false;
  callback(null, this);
}
