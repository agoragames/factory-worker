Factory Worker
===

Factory Worker is a node.js library that creates the Factory pattern for object stores.  It assumes the objects are building respond to new() and save().  Other than that, it does not care.

Installation
---

Factory-worker is available on npm:

`npm install factory-worker`


Usage
---

To begin, we need to define our Factory.  We do this with the Factory.define method:

``` js
  var Factory = require('factory-worker');
  
  Factory.define(Profile, {
    "username":"Coolguy123",
    "first_name":"Cool",
    "last_name":"Guy"
  })
```

From there, we are able to use the `Factory.build()` and `Factory.create()` methods to create new objects of the time.  The difference between build and create is that create will automatically call the save() method on the built object.

See the examples directory for more information.


Credit
---

This library was inspired by [factory_girl](http://github.com/thoughtbot/factory_girl/) because I wanted something similar while working in NodeJS.  It is by no means as fully functional as factory_girl, but it's a start.

Author: Andrew Nordman <anordman@agoragames.com>
GitHub: http://github.com/cadwallion/