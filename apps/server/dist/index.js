"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var trpcExpress = __importStar(require("@trpc/server/adapters/express"));
var _app_1 = require("./routers/_app");
var context_1 = require("./trpc/context");
require("./auth/passportSetup");
var restRoutes_1 = __importDefault(require("./restRoutes"));
var app = (0, express_1["default"])();
var port = (_a = process.env.SERVER_PORT) !== null && _a !== void 0 ? _a : 3001;
app.use((0, cors_1["default"])({ origin: 'http://localhost:5173', credentials: true }));
app.use(passport_1["default"].initialize());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cookie_parser_1["default"])());
app.use('/api', restRoutes_1["default"]);
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: _app_1.appRouter,
    createContext: context_1.createContext
}));
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
