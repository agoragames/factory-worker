var Hash = require('hashish');
var Seq = require('seq');

module.exports = {
  patterns: {},
  define: function(key, model, def) {
    this.patterns[key] = {
      class: model,
      attributes: def
    }
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
      callbacks = []
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

    this.build(model, data, function(err, obj){
      if (err)
        throw(err);
      obj.save(function(error) {
        callback(error, obj);
      })
    });
  }
}
