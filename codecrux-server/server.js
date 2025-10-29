import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import publicRouter from './routes/publicRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

//  API EndPoints
app.get('/', (req, res) => { res.send('API Working'); });
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/public', publicRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});