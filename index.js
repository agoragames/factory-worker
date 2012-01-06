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

    object_data = Hash.merge(this.patterns[model].attributes, data)
    obj = new(this.patterns[model].class)(object_data)
    return obj
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
