"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locals_1 = __importDefault(require("../providers/locals"));
function sharedTokenMiddleware(req, res, next) {
    // Check for a shared token in the request headers
    const sharedToken = req.headers["x-shared-token"];
    if (!sharedToken || sharedToken !== locals_1.default.config().middleware.shared.secret) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    next();
}
exports.default = sharedTokenMiddleware;
