"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ServiceController_1 = __importDefault(require("../controllers/ServiceController"));
const CheckRoleMiddleware_1 = __importDefault(require("../middleware/CheckRoleMiddleware"));
const router = express_1.default.Router();
router.post('/create', (0, CheckRoleMiddleware_1.default)('ADMIN'), ServiceController_1.default.Create);
router.get('/', ServiceController_1.default.GetAll);
router.get('/:id', ServiceController_1.default.GetById);
exports.default = router;
//# sourceMappingURL=ServiceRoute.js.map