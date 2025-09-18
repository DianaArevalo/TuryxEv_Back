
import { express as ex, cors, dotenv } from "./lib/Shared/Infraestructure/External";
import { connectMongo } from "./lib/db/mongoose";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";
import {config} from "./config/config"



const app = ex();

// Middlewares

app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(ex.json());


// Rutas
app.use("/api/users", ExpressUserRouter);

// Middleware de errores
app.use((
    err: unknown,
    req: ex.Request,
    res: ex.Response,
    next: ex.NextFunction
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
            console.log(`✅ Server is running on http://localhost:${config.port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });
