"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const get = (ctx) => {
    ctx.body = {
        page_url: `${config_1.default.api_origin}/pages/{id}`,
    };
};
exports.get = get;
