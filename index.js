var Hash = require('hashish');
var Seq = require('seq');

module.exports = {
  patterns: {},
  define: function(key, model, def) {
    var _model, _def;
    if (typeof(model) == 'string') {
      // If 'model' is a string, interpret it as the name of a model that has
      // already been defined. Try to inherit from that model.
      _model = this.patterns[model].class;
      _def = Hash.merge(this.patterns[model].attributes, def);
    } else {
      _model = model;
      _def = def;
    }
    this.patterns[key] = {
      class: _model,
      attributes: _def
    };
  },
  build: function(model, data, callback) {
    if (typeof(data) == 'function'){
      callback = data;
      data = {}
    }

    if (data === undefined) {
      data = {}
    }

    var attributes = this.patterns[model].attributes
    var values = Hash.merge(attributes, data);
    // no callback given so use direct style
    if (callback === undefined){
      values = Hash.map(values, function(value, key){
        if (typeof(value) == 'function'){
          if (value.length > 0){
            throw('you need to pass a callback to the build function - setter for attribute "' + key + '" is asynchronous');
          } else {
            return value.call();
          }
        } else {
          return value;
        }
      });
      var obj = new(this.patterns[model].class)(values);
      return obj;
    } else {
      // callback given, convert everything to function style
      var callbacks = []
      Hash.forEach(values, function(value, key){
        if (typeof(value) == 'function'){
          if (value.length == 0){
            callbacks.push({key: key, cbk: function(cbk){
              return cbk(null, value.call());
            }});
          } else {
            callbacks.push({key: key, cbk: value});
          }
        } else {
          callbacks.push({key: key, cbk: function(cbk){
            return cbk(null, value);
          }});
        }
      });
      Seq(callbacks)
        .parEach(function(value){
          value.cbk(this.into(value.key));
        })
        .seq(function(){
          var obj = new(module.exports.patterns[model].class)(this.vars);
          callback(null, obj);
        })
        .catch(function(err){
          callback(err);
        });
    }
  },
  create: function(model, data, callback) {
    if (typeof(data) == 'function') {
      callback = data;
      data = {};
    }

    this.build(model, data, function(err, builtObj){
      if (err)
        throw(err);
      builtObj.save(function(error, createdObj) {
        callback(error, createdObj);
      })
    });
  }
}
