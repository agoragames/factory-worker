(function() {
  var Hash = require('hashish');
  
  module.exports = Factory;
  
  function Factory() {}
  
  Factory.patterns = Hash({});
  Factory.define = function(key, model, def) {
    Factory.patterns[key] = { "class": model, "attributes": def };
  }
  Factory.build = function(model, data) {
    if (data === undefined) {
      data = {};
    }
    
    object_data = Hash.merge(Factory.patterns[model]["attributes"], data);
    object = new(Factory.patterns[model]["class"])(object_data);
  }
  Factory.create = function(model, data) {
    object = Factory.build(model, data);
    object.save();
    return object;
  }
})();