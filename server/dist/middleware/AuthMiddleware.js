"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../exeptions/ApiError"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
function AuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield userData.then(value => {
                if (!value) {
                    return next(ApiError_1.default.Unauthorized());
                }
                // @ts-ignore
                req.user = { email: value.email, id: value.id, isActivated: null, role: value.role };
            });
            next();
        }
        catch (e) {
            return next(ApiError_1.default.Unauthorized());
        }
    });
}
exports.default = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map