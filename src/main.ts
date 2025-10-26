
import { express as ex, cors } from "./lib/Shared/Infraestructure/External";
import { connectMongo } from "./lib/db/mongoose";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";
import {config} from "./config/config"
import { ExpressReservationRouter } from "./lib/Reservation/infrastructure/routers/express";
import { HttpError } from "./lib/Shared/domain/exeptions";
import { ApiResponse } from "./lib/User/infrastructure/ApiResponse";
import { ExpressHotelRouter } from "./lib/Hotel/infraestructure/routers/expressHotelRouter";



const app = ex();

// Middlewares

app.use(cors({ origin: config.mongoUri, credentials: true }));
app.use(ex.json());


// Rutas
app.use("/api/users", ExpressUserRouter);
app.use('/api/reservations', ExpressReservationRouter);
app.use('/api/hotel', ExpressHotelRouter)

// Middleware de errores
app.use((
    err: unknown,
    req: ex.Request,
    res: ex.Response,
    next: ex.NextFunction
) => {
    if (err instanceof HttpError) {
        const response: ApiResponse<null> = {
             success: false,
            title: "Ocurrio un error",
            message: err.message,
            body: null,
        };

        return res.status(err.statusCode).json(response);
    }

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


