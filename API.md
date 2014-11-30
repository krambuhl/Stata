Stata API
===

```js
Stata()
  .setup(func)
  .destroy(func)
  .listenTo(instance)
  .state(obj);
```

####Stata(value)
####Stata(function)

```js
var windowSize = Stata(function() {
  this.set('width', this.window.innerWidth());
  this.set('height', this.window.innerHeight());
});
```

####State(instance)

```js
var sameWindowSizeInstance = Stata(windowSize);
```

##Stata Instance Methods

###setup(func)

```js
windowSize.setup(function() {
  this.window = $(window);
  this.window.on('resize', this.update);
})
```

###cleanup(func)

```js
windowSize.cleanup(function() {
  this.window.off('resize', this.update);
})
```

###listenTo(name, instance)
or __listenTo({ name: instance })__

```js
var windowWidth = Stata(function() {
  return this.windowSize.get('width');
}).listenTo('windowSize', windowSize);
```


###state(value, opts)

__Simple Value States__

```js
// simple value stata
windowWidth.state(1080, function() {
  // runs when window resizes and the width is 1080px  
});
```


__Value States (with options)__

```js
// simple value stata
windowWidth.state(1080, {
  enter: function() {
    // run once when width evaluates to 1080px
  },
  
  update: function() {
    // run when window resizes and the wdith
    // remains at 1080px  
  },

  exit: function() {
    // run once when width evaluates
    // to anything other than 1080px
  }
});
```

__Comparison States__

```js
// comparison function 
// returns true if value is below 720px 
function isSmallSize(size, instance) {
  return size < 720;
}

// state value can be predicate function
// that returns a boolean, function will be
// fed the current value and instance as args.
windowWidth.state(isSmallSize, {
  enter: function() { },
  update: function() { },
  exit: function() { }
});
```

__Complex States__

```js
// for more complex Stata objects, states can be
// defined for a particular property or general
// object state. 
windowSize.state({
  property: 'width',
  value: isSmallWidth,
  once: function() { },
  enter: function() { },
  update: function() { },
  exit: function() { }
});

// Two signatures exist for defining single
// or multiple states.
windowSize.state([{
  property: 'width',
  value: isSmallWidth,
  update: function() { }
}, {
  value: function() { return !isSmallWidth(this.get('width')); },
  update: function() { }
}]);
```


######Sugaring

There are a number of state sugar methods signatures. All state sugar methods define states internally using the `state` method.

Sugar | Syntax
--- | ---
`enter(val, func)` | `state({ value: val,  enter: func })`
`enter(prop, val, func)` | `state({ property: prop, value: val, enter: func })`
`update(val, func)` | `state({ value: val, update: func })`
`update(prop, val, func)` | `state({ property: prop, value: val, update: func })`
`exit(val, func)` | `state({ value: val, exit: func })`
`exit(prop, val, func)` | `state({ property: prop, value: val, exit: func })`



```js
windowWidth.enter(isSmallWidth, function() { 
  // start mobile specific behavior
}).exit(isSmallWidth, function() { 
  // stop mobile specific behavior
});
```

```js
windowSize.enter('width', isSmallWidth, function() { 
  // start mobile specific behavior
}).exit('width', function(val) { return isSmallWidth(val); }, function() { 
  // stop mobile specific behavior
});
```