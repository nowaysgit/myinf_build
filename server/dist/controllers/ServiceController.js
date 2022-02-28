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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
class ServiceController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const serv = yield models_1.Service.create({ name });
                return res.json(serv);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static GetAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serv = yield models_1.Service.findAll();
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
                const serv = yield models_1.Service.findAll({ where: { id: req.body.id } });
                return res.json(serv);
            }
            catch (e) {
                return next(e);
            }
        });
    }
}
exports.default = ServiceController;
//# sourceMappingURL=ServiceController.js.map