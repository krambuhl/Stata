(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'));
  } else {
    root.Stata = factory(root.underscore);
  }
}(this, function(underscore) {
'use strict';

function Stata() {

}

return Stata;
}));
