import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongo } from "./lib/db/mongoose";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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
connectMongo()
    .then(() => {
        app.listen(3000, () => {
            console.log("✅ Server is running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });
