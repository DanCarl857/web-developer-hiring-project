"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External modules
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
// Middleware
const Error_middleware_1 = __importDefault(require("./api/middleware/Error.middleware"));
// Controllers
const Property_controller_1 = __importDefault(require("./api/controllers/Property.controller"));
const Authentication_controller_1 = __importDefault(require("./api/controllers/Authentication.controller"));
dotenv.config();
// Variables
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = express_1.default();
// Log all requests made to the console
function loggerMiddleware(request, response, next) {
    console.log(`[LOSS CONTROL]: ${request.method} ${request.path}`);
    next();
}
// Connect to Mongo database
mongoose_1.default.connect('mongodb://localhost/losscontrol-api', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true });
// App Configuration
app.use(helmet_1.default());
app.use(loggerMiddleware);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/v1/api', new Property_controller_1.default().router);
app.use('/v1/api', new Authentication_controller_1.default().router);
app.use(Error_middleware_1.default);
// Activate server
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
exports.default = app;
