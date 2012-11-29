
/**
 * Module dependencies.
 */

var utils = require('../utils');

/**
 * Define custom mixins.
 */

module.exports = function(mixins) {
  return function(style, rework){
    style.rules.forEach(function(rule){
      if (!rule.declarations) return;
      visit(rule.declarations, mixins);
    });
  }
};

/**
 * Visit declarations and apply mixins.
 *
 * @param {Array} declarations
 * @param {Object} mixins
 * @api private
 */

function visit(declarations, mixins) {
  for (var i = 0; i < declarations.length; ++i) {
    var decl = declarations[i];
    var key = decl.property;
    var val = decl.value;
    var fn = mixins[key];
    if (!fn) continue;
    
    // invoke mixin
    var ret = fn(val);

    // apply properties
    for (var key in ret) {
      declarations.splice(i++, 0, {
        property: key,
        value: ret[key]
      });
    }
  
    // remove original
    declarations.splice(i, 1);
  }
}