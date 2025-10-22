import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import Userrouter from './routes/Userroute.js';
import Productrouter from './routes/Productroute.js';
import cartrouter from './routes/Cartroute.js';



// No need to call cloudinary() here, as cloudinary.config() is already called in the config/cloudinary.js file


const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
connectDB()

const PORT = process.env.PORT || 3000;




// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use("/api/user",Userrouter)
app.use("/api/product",Productrouter)
app.use("/api/cart",cartrouter)

// Serve static files from frontend dist folder





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

