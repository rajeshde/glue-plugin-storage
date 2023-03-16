"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const locals_1 = __importDefault(require("../providers/locals"));
function webhookAuthMiddleware(req, res, next) {
    const { headers, body } = req;
    if (headers["content-length"])
        delete headers["content-length"];
    axios({
        url: locals_1.default.config().middleware.webhook.url,
        method: "POST",
        headers: headers,
        data: body,
    })
        .then((response) => {
        if (response.status === 200) {
            next();
        }
        else {
            return res.status(response.status).send(response.data);
        }
    })
        .catch((error) => {
        return res.status(401).send({ error: error.response.data });
    });
}
exports.default = webhookAuthMiddleware;
