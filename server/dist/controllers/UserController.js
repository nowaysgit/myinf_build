"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const uuid_1 = __importDefault(require("uuid"));
const path_1 = __importDefault(require("path"));
const models_1 = __importStar(require("../models/models"));
const db_1 = require("../db");
const UserService_1 = __importDefault(require("../services/UserService"));
const express_validator_1 = require("express-validator");
class UserController {
    Registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(ApiError_1.default.BadRequest('Ошибка при валидации!', errors.array()));
                }
                const { email, password, password2 } = req.body;
                yield UserService_1.default.Registration(email, password, password2);
                return res.json();
            }
            catch (e) {
                return next(e);
            }
        });
    }
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(ApiError_1.default.BadRequest('Ошибка при валидации!', errors.array()));
                }
                const { email, password } = req.body;
                const userData = yield UserService_1.default.Login(email, password);
                res.cookie('refreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    Logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield UserService_1.default.Logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.status(200).json({ message: 'Вы больше не авторизованны' });
            }
            catch (e) {
                return next(e);
            }
        });
    }
    Activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activateLink = req.params.link;
                yield UserService_1.default.Activate(activateLink);
                return res.redirect(process.env.CLIENT_URL);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    Refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield UserService_1.default.Refresh(refreshToken);
                res.cookie('refreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    GetById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (isNaN(parseInt(id, 10))) {
                    return next(ApiError_1.default.BadRequest('Неверный id пользователя'));
                }
                const userInfo = yield models_1.default.UserInfo.findOne({
                    where: { userId: id },
                    include: [
                        {
                            as: "user_services",
                            model: models_1.default.UserService,
                            include: [
                                {
                                    as: "service",
                                    model: models_1.default.Service,
                                }
                            ]
                        }
                    ]
                });
                if (!userInfo) {
                    return next(ApiError_1.default.BadRequest('Пользователя не существует'));
                }
                return res.json(userInfo);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    GetByLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { link } = req.params;
                const userInfo = yield models_1.default.UserInfo.findOne({
                    where: { profileLink: link },
                    include: [
                        {
                            as: "user_services",
                            model: models_1.default.UserService,
                            include: [
                                {
                                    as: "service",
                                    model: models_1.default.Service,
                                }
                            ]
                        }
                    ]
                });
                if (!userInfo) {
                    return next(ApiError_1.default.BadRequest('Пользователя не существует'));
                }
                return res.json(userInfo);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    GetAuthProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("user " + req.user);
                if (!req.user || typeof req.user === 'undefined' || req.user === null) {
                    return next(ApiError_1.default.Unauthorized());
                }
                const id = req.user.id;
                console.log("id " + id);
                if (isNaN(parseInt(id, 10))) {
                    return next(ApiError_1.default.BadRequest('Неверный id пользователя'));
                }
                const userInfo = yield models_1.default.UserInfo.findOne({
                    where: { userId: id },
                    include: [
                        {
                            as: "user_services",
                            model: models_1.default.UserService,
                            include: [
                                {
                                    as: "service",
                                    model: models_1.default.Service,
                                }
                            ]
                        }
                    ]
                });
                if (!userInfo) {
                    return next(ApiError_1.default.BadRequest('Пользователя не существует'));
                }
                return res.json(userInfo);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, profileLink, name, description, emoji, user_services } = req.body.user;
                console.log(req.body);
                // @ts-ignore
                if (req.files) {
                    // @ts-ignore
                    const { img } = req.files;
                    const fileName = uuid_1.default.v4() + '.jpg';
                    img.mv(path_1.default.resolve(__dirname, '..', 'static', 'user_image', fileName));
                }
                let updatedUserInfo = yield models_1.UserInfo.update({
                    name: name,
                    description: description,
                    emoji: emoji,
                    profileLink: profileLink,
                    image: req.body.image
                }, { returning: true, where: { userId: id } });
                console.log(user_services);
                if (user_services) {
                    yield user_services.forEach(service => 
                    // @ts-ignore
                    (0, db_1.UpdateOrCreate)(models_1.default.UserService, { id: service.id, userInfoId: id }, {
                        url: service.url,
                        type: service.type,
                        serviceId: service.serviceId,
                        userInfoId: id
                    }));
                }
                res.json();
            }
            catch (e) {
                return next(e);
            }
        });
    }
    UpdatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(ApiError_1.default.BadRequest('Ошибка при валидации!', errors.array()));
                }
                const { id, password } = req.body;
                const userData = yield UserService_1.default.UpdatePassword(id, password);
                res.cookie('refreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
                res.json();
            }
            catch (e) {
                return next(e);
            }
        });
    }
    UpdateEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(ApiError_1.default.BadRequest('Ошибка при валидации!', errors.array()));
                }
                const { id, email } = req.body;
                const userData = yield UserService_1.default.UpdateEmail(id, email);
                res.cookie('refreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
                res.json();
            }
            catch (e) {
                return next(e);
            }
        });
    }
    UpdateAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                // @ts-ignore
                const avatar = req.files['file'][0];
                yield UserService_1.default.UpdateAvatar(id, avatar);
                res.json();
            }
            catch (e) {
                return next(e);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map