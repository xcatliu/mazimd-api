"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Theme_1 = require("../../models/Theme");
const createError_1 = require("../../utils/createError");
const config_1 = require("../../config");
function get(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = ctx.params.id;
        if (!id) {
            return yield Promise.reject(createError_1.default(400, 'id is null or undefined'));
        }
        return yield new Promise((resolve, reject) => {
            Theme_1.default.find({ id }, (err, themes) => {
                if (err) {
                    return reject(createError_1.default(400, err));
                }
                if (Array.isArray(themes) && themes.length > 0) {
                    ctx.body = {
                        url: `${config_1.default.api_origin}/themes/${id}`,
                        html_url: `${config_1.default.html_origin}/themes/${id}`,
                        id: themes[0].id,
                        name: themes[0].name,
                        css: themes[0].css,
                        created_at: themes[0].created_at,
                    };
                    return resolve();
                }
                return reject(createError_1.default(404, 'Not Found'));
            });
        });
    });
}
exports.get = get;
;
