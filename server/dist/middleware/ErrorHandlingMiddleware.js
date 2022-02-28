"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../exeptions/ApiError"));
function ErrorMiddleware(err, req, res, next) {
    console.log("ErrorMiddleware");
    console.log(err);
    if (err instanceof ApiError_1.default) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: "Неизвестная ошибка, Сообщите администратору!", errors: err });
}
exports.default = ErrorMiddleware;
//# sourceMappingURL=ErrorHandlingMiddleware.js.map