"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const express_validator_1 = require("express-validator");
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const multer = require('multer');
const upload = multer();
const router = express_1.default.Router();
router.post('/registration', (0, express_validator_1.body)('email').trim().notEmpty().withMessage('Заполните поле эл. почта').isEmail().withMessage('Неверный формат эл. почты'), (0, express_validator_1.body)('password2').notEmpty().withMessage('Заполните поле пароль 2'), (0, express_validator_1.body)('password').notEmpty().withMessage('Заполните поле пароль').isLength({ min: 5, max: 36 }).withMessage('Длина пароля должна быть не менее 6 символов и не более 36 символов')
    .custom((value, { req, path }) => {
    if (value !== req.body.password2) {
        throw new Error("Passwords don't match");
    }
    else {
        return value;
    }
}).withMessage('Пароли не совпадают'), UserController_1.default.Registration);
router.post('/login', (0, express_validator_1.body)('email').trim().notEmpty().withMessage('Заполните поле эл. почта').isEmail().withMessage('Неверный формат эл. почты'), (0, express_validator_1.body)('password').notEmpty().withMessage('Заполните поле пароль'), UserController_1.default.Login);
router.post('/logout', AuthMiddleware_1.default, UserController_1.default.Logout);
router.post('/update', AuthMiddleware_1.default, UserController_1.default.Update);
router.post('/updatepassword', AuthMiddleware_1.default, (0, express_validator_1.body)('password').notEmpty().withMessage('Заполните поле пароль').isLength({ min: 5, max: 36 }).withMessage('Длина пароля должна быть не менее 6 символов и не более 36 символов'), UserController_1.default.UpdatePassword);
router.post('/updateemail', AuthMiddleware_1.default, (0, express_validator_1.body)('email').trim().notEmpty().withMessage('Заполните поле эл. почта').isEmail().withMessage('Неверный формат эл. почты'), UserController_1.default.UpdateEmail);
router.post('/updateavatar', AuthMiddleware_1.default, upload.fields([{ name: 'file', maxCount: 1 }, { name: 'id', maxCount: 1 }]), UserController_1.default.UpdateAvatar);
router.get('/activate/:link', UserController_1.default.Activate);
router.get('/refresh', UserController_1.default.Refresh);
router.get('/auth-profile', AuthMiddleware_1.default, UserController_1.default.GetAuthProfile);
router.get('/getbyid/:id', UserController_1.default.GetById);
router.get('/getbylink/:link', UserController_1.default.GetByLink);
exports.default = router;
//# sourceMappingURL=UserRoute.js.map