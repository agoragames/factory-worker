(function() {
  var Hash = require('hashish');
  
  module.exports = Factory;
  
  function Factory() {}
  
  Factory.patterns = Hash({});
  Factory.define = function(model, def) {
    Factory.patterns[model] = def;
  }
  Factory.build = function(model, data) {
    if (data === undefined) {
      data = {};
    }
    
    object_data = Hash.merge(Factory.patterns[model], data);
    object = new(model)(object_data);
  }
  Factory.create = function(model, data) {
    object = Factory.build(model, data);
    object.save();
    return object;
  }
})();