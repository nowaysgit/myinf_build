"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static Internal(message) {
        return new ApiError(500, message);
    }
    static Forbidden(message) {
        return new ApiError(403, message);
    }
    static Unauthorized() {
        return new ApiError(401, 'Пользователь не авторизован!');
    }
    static NoneRules() {
        return new ApiError(403, 'Нет доступа!');
    }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map