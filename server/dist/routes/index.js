"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = __importDefault(require("./UserRoute"));
const AppRoute_1 = __importDefault(require("./AppRoute"));
const UserAppRoute_1 = __importDefault(require("./UserAppRoute"));
const router = express_1.default.Router();
router.use('/user', UserRoute_1.default);
router.use('/service', AppRoute_1.default);
router.use('/user-app', UserAppRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map