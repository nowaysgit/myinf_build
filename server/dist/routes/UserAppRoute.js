"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserAppController_1 = __importDefault(require("../controllers/UserAppController"));
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const router = express_1.default.Router();
router.post('/create', AuthMiddleware_1.default, UserAppController_1.default.Create);
router.delete('/delete', AuthMiddleware_1.default, UserAppController_1.default.Delete);
router.post('/update', AuthMiddleware_1.default, UserAppController_1.default.Update);
router.get('/', UserAppController_1.default.GetAll);
router.get('/:id', UserAppController_1.default.GetById);
exports.default = router;
//# sourceMappingURL=UserAppRoute.js.map