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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importStar(require("../models/models"));
class UserAppController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { app } = req.body;
                const serv = yield models_1.UserService.create({
                    userInfoId: req.user.id,
                    url: app.url,
                    serviceId: app.service.id
                });
                const userApp = yield models_1.default.UserService.findOne({
                    where: { id: serv.id },
                    include: [
                        {
                            as: "service",
                            model: models_1.default.Service,
                        }
                    ]
                });
                return res.status(200).json({ status: true, user_service: userApp });
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { app } = req.body;
                console.log(app);
                yield models_1.UserService.update({
                    url: app.url
                }, { returning: false, where: { id: app.id } });
                return res.status(200);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static Delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                yield models_1.UserService.destroy({ where: { id: id }, restartIdentity: true, cascade: false });
                return res.json(200);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static GetAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serv = yield models_1.UserService.findAll({ where: { userInfoId: req.body.userInfoId } });
                return res.json(serv);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static GetById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serv = yield models_1.UserService.findAll({ where: { id: req.body.id } });
                return res.json(serv);
            }
            catch (e) {
                return next(e);
            }
        });
    }
}
exports.default = UserAppController;
//# sourceMappingURL=UserAppController.js.map