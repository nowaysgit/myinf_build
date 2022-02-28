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
exports.Tokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models/models");
const UserDto_1 = __importDefault(require("../dtos/UserDto"));
class Tokens {
    constructor(accessToken, refreshToken) {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
    }
}
exports.Tokens = Tokens;
class TokenService {
    MakeNewToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = new UserDto_1.default(user);
            const tokens = yield this.GenerateTokens(Object.assign({}, userDto));
            yield this.SaveToken(userDto.id, tokens.RefreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    GenerateTokens(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
            const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
            return new Tokens(accessToken, refreshToken);
        });
    }
    ValidateAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
                return result;
            }
            catch (e) {
                return null;
            }
        });
    }
    ValidateRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
                return result;
            }
            catch (e) {
                return null;
            }
        });
    }
    SaveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield models_1.Token.findOne({ where: { userId: userId } });
            if (tokenData) {
                // @ts-ignore
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            return yield models_1.Token.create({
                userId: userId,
                refreshToken: refreshToken
            });
        });
    }
    Remove(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.Token.destroy({ where: { refreshToken: refreshToken } });
            console.log(result);
            return result;
        });
    }
    Find(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield models_1.Token.findOne({ where: { refreshToken: refreshToken } });
            return tokenData;
        });
    }
}
exports.default = new TokenService();
//# sourceMappingURL=TokenService.js.map