"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../config");
function default_1(callback) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config_1.default.db, callback);
}
exports.default = default_1;
