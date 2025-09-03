import { express as ex, cors, dotenv } from "./lib/Shared/Infraestructure/External";
import { connectMongo } from "./lib/db/mongoose";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";

dotenv.config();

const app = ex();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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
connectMongo()
    .then(() => {
        app.listen(3000, () => {
            console.log("✅ Server is running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });
