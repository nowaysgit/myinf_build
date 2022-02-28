"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserServiceController_1 = __importDefault(require("../controllers/UserServiceController"));
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const router = express_1.default.Router();
router.post('/create', AuthMiddleware_1.default, UserServiceController_1.default.Create);
router.delete('/delete', AuthMiddleware_1.default, UserServiceController_1.default.Delete);
router.put('/update', AuthMiddleware_1.default, UserServiceController_1.default.Update);
router.get('/', UserServiceController_1.default.GetAll);
router.get('/:id', UserServiceController_1.default.GetById);
exports.default = router;
//# sourceMappingURL=UserServiceRoute.js.map