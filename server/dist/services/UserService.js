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
const models_1 = require("../models/models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const EmailService_1 = __importDefault(require("../services/EmailService"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
const sharp_1 = __importDefault(require("sharp"));
const ApiError_1 = __importDefault(require("../exeptions/ApiError"));
const process = require('process');
const path = require('path');
const sequelize_1 = require("sequelize");
class UserService {
    Registration(email, password, password2) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.User.findOne({ where: { email: email } });
            if (candidate) {
                throw ApiError_1.default.BadRequest('Пользователь с такой почтой уже существует!');
            }
            let hashPassword = yield bcrypt_1.default.hash(password, 3);
            let activationLink = (0, uuid_1.v4)();
            const user = yield models_1.User.create({
                email: email,
                activate: false,
                activate_link: activationLink,
                password: hashPassword,
                passwordLastUpdate: new Date().toISOString()
            });
            const userInfo = yield models_1.UserInfo.create({
                name: '',
                description: '',
                userId: user.id
            });
            yield EmailService_1.default.SendActivationEmail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
            yield this.ClearPeople();
            return; //TokenService.MakeNewToken(user);
        });
    }
    ClearPeople() {
        return __awaiter(this, void 0, void 0, function* () {
            const candidates = yield models_1.User.findAll({ where: { activate: false, createdAt: {
                        [sequelize_1.Op.lt]: new Date(Date.now() - 86400000)
                    } } });
            if (!candidates)
                return;
            candidates.map((candidate) => __awaiter(this, void 0, void 0, function* () {
                const info = yield models_1.UserInfo.findOne({ where: { userId: candidate.id } });
                if (info) {
                    yield info.destroy();
                    yield candidate.destroy();
                }
            }));
        });
    }
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { email: email } });
            if (!user) {
                throw ApiError_1.default.BadRequest('Пользователь с таким email не найден', [{ value: '', msg: 'Пользователь с таким email не найден', param: 'email', location: 'body' }]);
            }
            const isPassEqual = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassEqual) {
                throw ApiError_1.default.BadRequest('Введен неверный пароль', [{ value: '', msg: 'Введен неверный пароль', param: 'password', location: 'body' }]);
            }
            return TokenService_1.default.MakeNewToken(user);
        });
    }
    Logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield models_1.Token.findOne({ where: { refreshToken: refreshToken } });
            if (!token) {
                throw ApiError_1.default.BadRequest('Токен не найден!');
            }
            return yield TokenService_1.default.Remove(refreshToken);
        });
    }
    Refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError_1.default.Unauthorized();
            }
            const userData = yield TokenService_1.default.ValidateRefreshToken(refreshToken);
            const tokenData = yield TokenService_1.default.Find(refreshToken);
            if (!userData || !tokenData) {
                throw ApiError_1.default.Unauthorized();
            }
            // @ts-ignore
            const user = yield models_1.User.findOne({ where: { id: userData.id } });
            return TokenService_1.default.MakeNewToken(user);
        });
    }
    Activate(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { activate_link: link } });
            if (!user) {
                throw ApiError_1.default.BadRequest('Некорректная ссылка на активацию!');
            }
            user.activate = true;
            yield user.save();
        });
    }
    UpdatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let hashPassword = yield bcrypt_1.default.hash(password, 3);
            yield models_1.User.update({
                password: hashPassword,
                passwordLastUpdate: new Date().toISOString()
            }, { returning: true, where: { id: id } });
            const user = yield models_1.User.findOne({ where: { id: id } });
            return TokenService_1.default.MakeNewToken(user);
        });
    }
    UpdateEmail(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.User.update({
                email: email
            }, { returning: true, where: { id: id } });
            const user = yield models_1.User.findOne({ where: { id: id } });
            return TokenService_1.default.MakeNewToken(user);
        });
    }
    UpdateAvatar(id, avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserInfo.findOne({ where: { userId: id } });
            let avatarName = (0, uuid_1.v4)();
            avatarName = avatarName + ".jpeg";
            if (user.avatar != null) {
                avatarName = user.avatar;
            }
            const dir = process.argv[2];
            const output_path = path.join(dir, "..", "..", "..", "client", "public", "user_images");
            const resized = yield (0, sharp_1.default)(avatar.buffer).resize(500, 500)
                .toFormat("jpeg", { mozjpeg: true })
                .toFile(path.join(output_path, avatarName));
            if (user.avatar == null) {
                yield models_1.UserInfo.update({
                    avatar: avatarName
                }, { returning: true, where: { userId: id } });
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map