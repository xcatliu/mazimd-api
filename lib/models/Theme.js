"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ThemeSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    css: String,
    created_at: Date,
});
exports.default = mongoose_1.model('Theme', ThemeSchema);
