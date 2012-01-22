var Hash = require('hashish');

module.exports = {
  patterns: {},
  define: function(key, model, def) {
    this.patterns[key] = {
      class: model,
      attributes: def
    }
  },
  build: function(model, data) {
    if (data === undefined) {
      data = {}
    }

    var attributes = this.patterns[model].attributes
    var values = Hash.map(attributes, function(value, key){
      if (typeof(value) == 'function'){
        return value.call(data);
      } else {
        return value;
      }
    });
    values = Hash.merge(values, data);
    obj = new(this.patterns[model].class)(values);
    return obj;
  },
  create: function(model, data, callback) {
    if (typeof(data) == 'function') {
      callback = data;
      data = {}
    }

    var obj = this.build(model, data)
    obj.save(function(error) {
      callback(error, obj)
    })
  }
}
