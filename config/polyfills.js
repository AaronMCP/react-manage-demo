/* eslint-disable */

"use strict";

if (typeof Promise === "undefined") {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require("promise/lib/rejection-tracking").enable();
  window.Promise = require("promise/lib/es6-extensions.js");
}

require("core-js/modules/es6.date.now");
require("core-js/modules/es6.date.to-iso-string");
require("core-js/modules/es6.array.from");
require("core-js/es6/map");
require("core-js/es6/set");
require("regenerator-runtime/runtime");

// fetch() polyfill for making API calls.
require("whatwg-fetch");
// require("@babel/polyfill");

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
// Object.assign = require("object-assign");
