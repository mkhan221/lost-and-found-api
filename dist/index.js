"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ItemsRoutes_1 = __importDefault(require("./routes/ItemsRoutes"));
const LocationsRoutes_1 = __importDefault(require("./routes/LocationsRoutes"));
const QrCodesRoutes_1 = __importDefault(require("./routes/QrCodesRoutes"));
const UsersRoutes_1 = __importDefault(require("./routes/UsersRoutes"));
const UserItemsRoutes_1 = __importDefault(require("./routes/UserItemsRoutes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
console.log("DEBUG DATABASE_URL =", JSON.stringify(process.env.DATABASE_URL));
console.log("DEBUG RENDER =", JSON.stringify(process.env.RENDER));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve uploaded images publicly
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Lost & Found API",
            version: "1.0.0",
            description: "API for managing lost and found items",
        },
    },
    apis: ["./src/routes/*.ts"], // <-- look for JSDoc comments in routes
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Base route
app.get("/", (_, res) => {
    res.send("Lost & Found API is running");
});
// Items routes
app.use("/items", ItemsRoutes_1.default);
app.use("/locations", LocationsRoutes_1.default);
app.use("/qrcodes", QrCodesRoutes_1.default);
app.use("/users", UsersRoutes_1.default);
app.use("/userItems", UserItemsRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.debug(`Swagger UI available at http://localhost:${port}/api/docs`);
});
