"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeLogger = void 0;
const timeLogger = (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
};
exports.timeLogger = timeLogger;
