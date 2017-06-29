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
const Page_1 = require("../models/Page");
const createError_1 = require("../utils/createError");
const generateUniqueId_1 = require("../utils/generateUniqueId");
const expireStringMillisecondMap_1 = require("../utils/expireStringMillisecondMap");
const config_1 = require("../config");
const post = (ctx) => __awaiter(this, void 0, void 0, function* () {
    if (!ctx.request.body) {
        return yield Promise.reject(createError_1.default(400, 'Request body is null or undefined'));
    }
    const content = ctx.request.body.content;
    if (typeof content === 'undefined') {
        return yield Promise.reject(createError_1.default(400, 'content is undefined'));
    }
    if (typeof content !== 'string') {
        return yield Promise.reject(createError_1.default(400, 'content is not a string'));
    }
    if (content === '') {
        return yield Promise.reject(createError_1.default(400, 'content is empty'));
    }
    let expire_in = ctx.request.body.expire_in;
    if (typeof expire_in === 'undefined') {
        expire_in = 'forever';
    }
    if (typeof expire_in !== 'string') {
        return yield Promise.reject(createError_1.default(400, 'expire_in is not a string'));
    }
    if (expire_in === '') {
        return yield Promise.reject(createError_1.default(400, 'expire_in is empty'));
    }
    if (Object.keys(expireStringMillisecondMap_1.default).indexOf(expire_in) === -1) {
        return yield Promise.reject(createError_1.default(400, 'expire_in is not acceptable'));
    }
    const page = new Page_1.default({
        id: generateUniqueId_1.default(),
        content: ctx.request.body.content,
        created_at: new Date(),
        expire_in,
    });
    return yield page.save().then((savedPage) => {
        ctx.body = {
            url: `${config_1.default.api_origin}/pages/${savedPage.id}`,
            html_url: `${config_1.default.html_origin}/pages/${savedPage.id}`,
            id: savedPage.id,
            content: savedPage.content,
            created_at: savedPage.created_at,
        };
        // 201 Created
        ctx.status = 201;
    }, (error) => {
        return Promise.reject(createError_1.default(500, error.message));
    });
});
exports.post = post;
