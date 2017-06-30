"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
function get(ctx) {
    ctx.body = {
        page_url: `${config_1.default.api_origin}/pages/{id}`,
        themes_url: `${config_1.default.api_origin}/themes{/id}`,
    };
}
exports.get = get;
;
