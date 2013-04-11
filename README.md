# Factory Worker [![Build Status](https://travis-ci.org/agoragames/factory-worker.png?branch=master)](https://travis-ci.org/agoragames/factory-worker)

Factory Worker is a node.js library that creates the Factory pattern for object stores.  It assumes the objects are building respond to new() and save().  Other than that, it does not care.

## Installation

Factory-worker is available on npm:

`npm install factory-worker`


## Usage

To begin, we need to define our Factory.  We do this with the Factory.define method:

``` js
  var Factory = require('factory-worker');
  
  Factory.define("profile", Profile, {
    "username":"Coolguy123",
    "first_name":"Cool",
    "last_name":"Guy",
    "created_at": function(){
      return new Date();
    }
  });
```

In the example above, we've created the "profile" Factory for the class Profile with our default attributes.

The `created_at` attribute will be filled dynamically by evaluating the function at object build time. This is useful to dynamically fill attributes with a name generator, e.g. https://github.com/marak/Faker.js/


*build(factory, [attributes], [callback])*

Builds an instance of the factory, overriding the factory with the attributes hash if passed. 

If a callback is passed, it is possible to use callback functions for building attributes. The callback is detected by checking if the attribute function will accept arguments. Here is an example that will create
BlogEntry for a Comment object and set the foreign key accordingly.

```js
  var Factory = require('factory-worker');

  Factory.define("comment", Comment, {
    "text": "Comment text",
    "blogEntry": function(callback){
      Factory.create("BlogEntry", function(err, entry){
        callback(err, entry._id);
      });
    }
  });

  Factory.build("comment", {text: "some other comment text"}, function(err, comment){
    console.log(err, comment);
  });
```

*create(factory, [attributes], callback)*

Calls the `build` function followed by calling `save(callback)` on the created object.

See the `examples` directory for more information.

## Testing

FactoryWorker uses [jessie](https://github.com/futuresimple/jessie) for tests.  The test 
suite can be invoked with `npm test`.

## Contributing

Contributions are welcome, submit a pull request and I'll happily take a look. I only ask that 
you don't alter the version of the library in your pull request.


## Credit

This library was inspired by [factory_girl](http://github.com/thoughtbot/factory_girl/) because I wanted something similar while working in NodeJS.
It is by no means as fully functional as `factory_girl`, but it's a start.

* [Andrew Nordman](http://github.com/cadwallion/)

