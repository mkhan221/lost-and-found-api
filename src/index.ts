import express from "express";
import dotenv from "dotenv";
import ItemsRoutes from "./routes/ItemsRoutes";
import LocationsRoutes from "./routes/LocationsRoutes";
import QrCodesRoutes from "./routes/QrCodesRoutes";
import UsersRoutes from "./routes/UsersRoutes";
import UserItemsRoutes from "./routes/UserItemsRoutes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
import path from "path";


dotenv.config();

console.log("DEBUG DATABASE_URL =", JSON.stringify(process.env.DATABASE_URL));
console.log("DEBUG RENDER =", JSON.stringify(process.env.RENDER));


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve uploaded images publicly
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route
app.get("/", (_, res) =>
{
    res.send("Lost & Found API is running");
});

// Items routes
app.use("/items", ItemsRoutes);
app.use("/locations", LocationsRoutes);
app.use("/qrcodes", QrCodesRoutes);
app.use("/users", UsersRoutes);
app.use("/userItems", UserItemsRoutes);



app.listen(port, () =>
{
    console.log(`Server running on http://localhost:${port}`);
    console.debug(`Swagger UI available at http://localhost:${port}/api/docs`);
});
