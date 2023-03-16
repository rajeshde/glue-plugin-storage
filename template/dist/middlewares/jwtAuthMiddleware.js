"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commons_1 = __importDefault(require("../controllers/commons"));
function jwtAuthMiddleware(req, res, next) {
    // Verify the JWT token
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    // graphql query
    commons_1.default.AuthGQLRequest({
        variables: {},
        query: `query me { users { id } }`,
        token: token
    })
        .then(({ data }) => {
        var _a;
        if ((_a = data === null || data === void 0 ? void 0 : data.users) === null || _a === void 0 ? void 0 : _a[0]) {
            return next();
        }
        return res.status(401).send({ error: "Unauthorized" });
    })
        .catch((error) => {
        return res.status(401).send({ error: "Unauthorized" });
    });
}
exports.default = jwtAuthMiddleware;
