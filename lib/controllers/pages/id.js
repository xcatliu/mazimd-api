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
const Page_1 = require("../../models/Page");
const createError_1 = require("../../utils/createError");
const expireStringMillisecondMap_1 = require("../../utils/expireStringMillisecondMap");
const config_1 = require("../../config");
const get = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const id = ctx.params.id;
    if (!id) {
        return yield Promise.reject(createError_1.default(400, 'id is null or undefined'));
    }
    return yield new Promise((resolve, reject) => {
        Page_1.default.find({ id }, (err, pages) => {
            if (err) {
                return reject(createError_1.default(400, err));
            }
            if (Array.isArray(pages) && pages.length > 0) {
                const result = generatePageAPIResult({
                    id,
                    content: pages[0].content,
                    created_at: pages[0].created_at,
                    expire_in: pages[0].expire_in,
                });
                if (result instanceof Error) {
                    return reject(result);
                }
                ctx.body = result;
                return resolve();
            }
            return reject(createError_1.default(404, 'Not Found'));
        });
    });
});
exports.get = get;
function generatePageAPIResult({ id, content, created_at, expire_in }) {
    const createdDateNumber = Number(created_at);
    const currentDateNumber = Number(new Date());
    const expireNumber = expireStringMillisecondMap_1.default[expire_in];
    if (createdDateNumber + expireNumber < currentDateNumber) {
        return createError_1.default(404, 'Resource has expired');
    }
    return {
        url: `${config_1.default.api_origin}/pages/${id}`,
        html_url: `${config_1.default.html_origin}/pages/${id}`,
        id,
        content,
        created_at,
    };
}
