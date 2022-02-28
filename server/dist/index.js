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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const models = require("./models/models");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const index_1 = __importDefault(require("./routes/index"));
const path_1 = __importDefault(require("path"));
const ErrorHandlingMiddleware_1 = __importDefault(require("./middleware/ErrorHandlingMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
app.use('/api', index_1.default);
app.use(ErrorHandlingMiddleware_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate();
        yield db_1.default.sync();
        app.listen(port, () => {
            return console.log(`server is listening on ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start().then(r => { console.log(`Started`); });
//# sourceMappingURL=index.js.map