"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("../routes/upload"));
/**
 * Initialize all routes
 */
class Routes {
    upload(_express) {
        return _express.use("/", upload_1.default);
    }
}
exports.default = new Routes();
