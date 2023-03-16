"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function noAuthMiddleware(req, res, next) {
    // Do nothing, allow all requests
    next();
}
exports.default = noAuthMiddleware;
