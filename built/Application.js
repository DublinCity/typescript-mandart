"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var method = require('method');
;
var app = {
    init: function () {
        this.cache = {};
        this.engines = {};
        this.settings = {};
        this._router = undefined;
    }
};
