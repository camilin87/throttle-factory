# throttle-factory  

[![Build Status](https://travis-ci.org/camilin87/throttle-factory.svg?branch=master)](https://travis-ci.org/camilin87/throttle-factory)

Another library to throttle calls. Seamlessly throttle calls.

```js
var throttleFactory = require("throttle-factory");
var throttle = throttleFactory(10, 1000);

// these 100 calls will take 10 seconds
for (var i = 0; i < 100; i++) {
    throttle.execute(() => {
        console.log("do something");
    });
}
```
