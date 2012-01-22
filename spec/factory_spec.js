describe('Factory#define', function() {
  it('stores the definition on the factory name', function() {
    dynamic_function = function() {
      return "dynamic";
    }

    Factory.define('test', TestModel, {
      name: 'Test Model',
      real: false,
      dynamic: dynamic_function})

    expect(Factory.patterns.test).toEqual({
      class: TestModel,
      attributes: {
        name: 'Test Model',
        real: false,
        dynamic: dynamic_function
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
    object = Factory.build('test') 
    expect(object.name).toEqual('Test Model')
    expect(object.real).toEqual(false)
    expect(object.dynamic).toEqual("dynamic")
  })

  it('takes an optional parameter to override stores attributes', function() {
    object = Factory.build('test', { real: true }) 
    expect(object.name).toEqual('Test Model')
    expect(object.real).toEqual(true)
  })
})

describe('Factory#create', function() {
  beforeEach(function() {
    Factory.define('test', TestModel, {
      name: 'Test Model',
      real: false,
      dynamic: function() {
        return "dynamic";
      }
    }) 
  })

  it('should call Factory.build, passing the factory name and data', function() {
    spyOn(Factory, 'build').andCallThrough()
    Factory.create('test', function(error) {})
    expect(Factory.build).toHaveBeenCalledWith('test', {})
  })

  it('can also override attributes like Factory#build', function() {
    var object;
    Factory.create('test', { name: 'Test Object', dynamic: "another value" }, function(e, o) {
      object = o; 
    })
    waitsFor(function() { return object != null}, 'object creation failed', 1000);
    runs(function() {
      expect(object.name).toEqual('Test Object');
      expect(object.dynamic).toEqual('another value');
    })
  })
})
