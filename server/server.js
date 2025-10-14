import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

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

// google login config
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    // Here you can handle the user information from Google
    console.log('Google profile:', profile);
    return done(null, profile);
  })
);

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

app.get('/api/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

app.get('/api/auth/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:5173/login',
  session: false
}), (req, res, next) => {
  // Successful authentication, redirect to frontend
  res.redirect(`http://localhost:5173/`);
});

//  API EndPoints
app.get('/', (req, res) => { res.send('API Working'); });
// app.use('/api/ai', aiRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});