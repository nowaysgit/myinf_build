"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../exeptions/ApiError"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
const jwt = require('jsonwebtoken');
function default_1(role) {
    return function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            console.log(authorizationHeader);
            if (!authorizationHeader) {
                return next(ApiError_1.default.Unauthorized());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            console.log(accessToken);
            if (!accessToken) {
                return next(ApiError_1.default.Unauthorized());
            }
            const userData = TokenService_1.default.ValidateAccessToken(accessToken);
            userData.then(value => {
                if (!value) {
                    return next(ApiError_1.default.Unauthorized());
                }
                // @ts-ignore
                if (value.role !== role) {
                    return next(ApiError_1.default.NoneRules());
                }
            });
            // @ts-ignore
            req.user = userData;
            next();
        }
        catch (e) {
            return next(ApiError_1.default.Unauthorized());
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=CheckRoleMiddleware.js.map