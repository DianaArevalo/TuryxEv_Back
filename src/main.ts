import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectMongo } from "./lib/db/mongoose";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";
import {config} from "./config/config"



const app = express();

// Middlewares
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
;

// Rutas
app.use("/api/users", ExpressUserRouter);

// Middleware de errores
app.use((
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof Error) {
        console.error(err.stack);
        return res.status(500).json(err.message);
    }
    console.error(err);
    return res.status(500).json("Something wrong!");
});

// Conectar DB y levantar servidor
connectMongo(config.mongoUri)
    .then(() => {
        app.listen(config.port, () => {
            console.log("✅ Server is running on http://localhost:${config.port}");
        });
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });
