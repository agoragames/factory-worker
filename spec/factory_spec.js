describe('Factory#define', function() {
  beforeEach(function() {
    dynamic_function = function() {
      return "dynamic";
    }

    callback_function = function(callback){
      return callback(null, 'called');
    }

    Factory.define('test', TestModel, {
      name: 'Test Model',
      real: false,
      dynamic: dynamic_function,
      called: callback_function
    })
  })

  it('stores the definition on the factory name', function() {
    expect(Factory.patterns.test).toEqual({
      class: TestModel,
      attributes: {
        name: 'Test Model',
        real: false,
        dynamic: dynamic_function,
        called: callback_function
      }
    })
  })
})

describe('Factory#build', function() {
  beforeEach(function() {
    Factory.define('test', TestModel, {
      name: 'Test Model',
      real: false,
      dynamic: function() {
        return "dynamic";
      }
    })
  })

  it('uses the stored definition to seed attribute values', function() {
    var object = Factory.build('test')
    expect(object.name).toEqual('Test Model')
    expect(object.real).toEqual(false)
    expect(object.dynamic).toEqual("dynamic")
  })

  it('takes an optional parameter to override stores attributes', function() {
    var object = Factory.build('test', { real: true })
    expect(object.name).toEqual('Test Model')
    expect(object.real).toEqual(true)
  })
})

describe('Factory#build_with_callback', function() {
  beforeEach(function() {
    Factory.define('test_callback', TestModel, {
      called: function(cbk) {
        return cbk(null, 'called');
      }
    })
  })

  it('uses the stored definition to seed attribute values', function() {
    var object = null;
    Factory.build('test_callback', function(err, obj){
      object = obj;
    });
    waitsFor(function() { return object != null}, 'object creation failed', 1000);
    runs(function(){
      expect(object.called).toEqual("called");
    });
  })

  it("throws an error if no callback is given", function(){
    expect(function(){
      Factory.build('test_callback');
    }).toThrow('you need to pass a callback to the build function - setter for attribute "called" is asynchronous');
  });
})

describe('Factory#create', function() {
  beforeEach(function() {
    Factory.define('test', TestModel, {
      name: 'Test Model',
      real: false,
      dynamic: function() {
        return "dynamic";
      },
      called: function(cbk) {
        return cbk(null, 'called');
      }
    })
  })

  it('should override attributes like Factory#build', function() {
    var object;
    Factory.create('test', { name: function(){return 'Test Object';}, dynamic: "another value", called: function(cbk){return cbk(null, 'new value');} }, function(e, o) {
      object = o;
    })
    waitsFor(function() { return object != null}, 'object creation failed', 1000);
    runs(function() {
      expect(object.name).toEqual('Test Object');
      expect(object.dynamic).toEqual('another value');
      expect(object.called).toEqual('new value');
    })
  })

  it('should returned saved object', function() {
    var object;
    Factory.create('test', function(e, o) {
      object = o;
    })
    waitsFor(function() { return object != null}, 'object creation failed', 1000);
    runs(function() {
      expect(object.isNew).toBe(false);
    })
  })
})
