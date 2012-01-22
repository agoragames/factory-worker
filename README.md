# Factory Worker

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
  })
```

In the example above, we've created the "profile" Factory for the class Profile with our default attributes.

The "created_at" attribute will be filled dynamically by evaluating the function at object build time. This is useful to dynamically fill attributes with a name generator, e.g. https://github.com/marak/Faker.js/


*build(factory, [attributes])*

Builds an instance of the factory, overriding the factory with the attributes hash if passed.

*create(factory, [attributes], callback)*

Calls the `build` function followed by calling `save(callback)` on the created object.

See the `examples` directory for more information.

## Testing

FactoryWorker uses jessie for tests.  If you have jessie globally installed (via `npm install -g jessie`)
you can run with `jessie spec`.  If you are like me and consider the -g switch akin to `sudo gem install`,
you can run the specs with `./node_modules/.bin/jessie spec` and you're all set.

## Contributing

Contributions are welcome, submit a pull request and I'll happily take a look. I only ask that you don't alter the
version of the library in your pull request.


## Credit

This library was inspired by [factory_girl](http://github.com/thoughtbot/factory_girl/) because I wanted something similar while working in NodeJS.
It is by no means as fully functional as factory\_girl, but it's a start.

* [Andrew Nordman](http://github.com/cadwallion/) <anordman@agoragames.com>

