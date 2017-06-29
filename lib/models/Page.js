"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PageSchema = new mongoose_1.Schema({
    id: String,
    content: String,
    created_at: Date,
    expire_in: String,
});
exports.default = mongoose_1.model('Page', PageSchema);
