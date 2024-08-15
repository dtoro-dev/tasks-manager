import express, { Application } from 'express';
import router from './routes';
import cors from 'cors';

// Crear una aplicación de Express
const app: Application = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas
app.use('/api', router);

// Middleware para manejar errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
