"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const numberString = Number(new Date()).toString();
    const offset = 3;
    const lastString = numberString.slice(numberString.length - offset - 1, numberString.length - 1);
    const frontString = numberString.slice(0, numberString.length - offset);
    return Number(lastString + frontString).toString(36);
};
