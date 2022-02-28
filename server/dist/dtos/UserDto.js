"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.role = model.role;
        this.passwordLastUpdate = model.passwordLastUpdate;
    }
}
exports.default = UserDto;
//# sourceMappingURL=UserDto.js.map