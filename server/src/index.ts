import express, {Express, Request, Response} from 'express';
import connectDB from './config/db';
import userRoutes from './routes/user-routes';
import tagRoutes from './routes/tag-routes';
import contentRoutes from './routes/content-routes'; 
import linkRoutes from './routes/link-routes';
import cors from 'cors';

connectDB();

const app: Express = express();

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['*'];

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // optional, if you use cookies or auth headers
}));

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/brain', linkRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});