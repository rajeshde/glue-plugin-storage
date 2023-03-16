"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locals_1 = __importDefault(require("../providers/locals"));
const noAuthMiddleware_1 = __importDefault(require("./noAuthMiddleware"));
const jwtAuthMiddleware_1 = __importDefault(require("./jwtAuthMiddleware"));
const sharedTokenMiddleware_1 = __importDefault(require("./sharedTokenMiddleware"));
const webhookAuthMiddleware_1 = __importDefault(require("./webhookAuthMiddleware"));
let myMiddleware = noAuthMiddleware_1.default;
switch (locals_1.default.config().middleware.use) {
    case "shared-token-auth":
        myMiddleware = sharedTokenMiddleware_1.default;
        break;
    case "jwt-auth":
        myMiddleware = jwtAuthMiddleware_1.default;
        break;
    case "webhook-auth":
        myMiddleware = webhookAuthMiddleware_1.default;
        break;
}
exports.default = myMiddleware;
