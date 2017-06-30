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
const Theme_1 = require("../models/Theme");
const createError_1 = require("../utils/createError");
const generateUniqueId_1 = require("../utils/generateUniqueId");
const config_1 = require("../config");
const getColorsFromString_1 = require("../utils/getColorsFromString");
function post(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.request.body) {
            return yield Promise.reject(createError_1.default(400, 'Request body is null or undefined'));
        }
        const name = ctx.request.body.name;
        if (typeof name === 'undefined') {
            return yield Promise.reject(createError_1.default(400, 'name is undefined'));
        }
        if (typeof name !== 'string') {
            return yield Promise.reject(createError_1.default(400, 'name is not a string'));
        }
        if (name === '') {
            return yield Promise.reject(createError_1.default(400, 'name is empty'));
        }
        const css = ctx.request.body.css;
        if (typeof css === 'undefined') {
            return yield Promise.reject(createError_1.default(400, 'css is undefined'));
        }
        if (typeof css !== 'string') {
            return yield Promise.reject(createError_1.default(400, 'css is not a string'));
        }
        if (css === '') {
            return yield Promise.reject(createError_1.default(400, 'css is empty'));
        }
        return yield new Promise((resolve, reject) => {
            Theme_1.default.find({ name }, (err, themes) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return reject(createError_1.default(400, err));
                }
                if (Array.isArray(themes) && themes.length > 0) {
                    return reject(createError_1.default(400, `The name "${name}" has already been taken, please use another name`));
                }
                const theme = new Theme_1.default({
                    id: generateUniqueId_1.default(),
                    name,
                    css,
                    created_at: new Date(),
                });
                return yield theme.save().then((savedTheme) => {
                    ctx.body = {
                        url: `${config_1.default.api_origin}/pages/${savedTheme.id}`,
                        html_url: `${config_1.default.html_origin}/pages/${savedTheme.id}`,
                        id: savedTheme.id,
                        name: savedTheme.name,
                        css: savedTheme.css,
                        colors: getColorsFromString_1.default(theme.css),
                        created_at: savedTheme.created_at,
                    };
                    // 201 Created
                    ctx.status = 201;
                    return resolve();
                }, (error) => {
                    return reject(createError_1.default(400, error.message));
                });
            }));
        });
    });
}
exports.post = post;
;
function get(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            Theme_1.default.find({}, (err, themes) => {
                if (err) {
                    return reject(createError_1.default(400, err));
                }
                if (Array.isArray(themes) && themes.length > 0) {
                    ctx.body = themes.map((theme) => {
                        return {
                            url: `${config_1.default.api_origin}/themes/${theme.id}`,
                            html_url: `${config_1.default.html_origin}/themes/${theme.id}`,
                            id: theme.id,
                            name: theme.name,
                            colors: getColorsFromString_1.default(theme.css),
                            created_at: theme.created_at,
                        };
                    });
                    return resolve();
                }
                return reject(createError_1.default(404, 'Not Found'));
            });
        });
    });
}
exports.get = get;
;
