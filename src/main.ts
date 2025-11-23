import { config } from './config/config';
import { ExpressBusinessRouter } from './lib/business/infrastructure/business.router';
import { connectMongo } from './lib/db/mongoose';
import { ExpressHotelRouter } from './lib/hotel/infrastructure/hotel.router';
import { ExpressLocationRouter } from './lib/location/infrastructure/location.router';
import { ExpressReservationRouter } from './lib/reservation/infrastructure/reservation.router';
import { HttpError } from './lib/shared/domain/exeptions';
import { ApiResponse, express as ex, cors } from './lib/shared/infrastructure';
import { ExpressSuperAdminRouter } from './lib/superadmin/infrastructure/superadmin.router';
import { ExpressUserRouter } from './lib/user/infrastructure/user.router';

const app = ex();

// Middlewares

app.use(cors({ origin: config.mongoUri, credentials: true }));
app.use(ex.json());

// Versionado de API's
app.use('/api/v1/business', ExpressBusinessRouter);
app.use('/api/v1/hotel', ExpressHotelRouter);
app.use('/api/v1/location', ExpressLocationRouter);
app.use('/api/v1/reservations', ExpressReservationRouter);
app.use('/api/v1/superadmin', ExpressSuperAdminRouter);
app.use('/api/v1/user', ExpressUserRouter);

// Middleware de errores
app.use((err: unknown, _req: ex.Request, res: ex.Response) => {
  if (err instanceof HttpError) {
    const response: ApiResponse<null> = {
      success: false,
      title: 'Ocurrio un error',
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
  return res.status(500).json('Something wrong!');
});

// Conectar DB y levantar servidor
connectMongo(config.mongoUri)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`✅ Server is running on http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
  });
