(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var area_1 = require("../modules/area");
var ticArea = new area_1.Area($('[data-tic-area]'));

},{"../modules/area":2}],2:[function(require,module,exports){
"use strict";
// import {AreaItems} from "./area-items";
var Area = (function () {
    function Area($el) {
        this.$el = $el;
        console.log(this.$el);
        this.area = this.$el.find('[data-area]');
        console.log(this.area);
        this.elements = this.$el;
        this.$el.empty();
        this.buildArea();
    }
    Area.prototype.buildArea = function () {
        this.$el.html(this.area);
    };
    return Area;
}());
exports.Area = Area;

},{}]},{},[1])

//# sourceMappingURL=build.js.map
