//----------------entry point for our backend or server----------------------//

import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
//import the error middlewares we created
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

//importing db connection
import connectDB from './config/db.js';
dotenv.config();

connectDB();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes);

app.get('/',(req,res)=>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname,'public/uploads')));
console.log(__dirname,'public/uploads');

app.listen(port,()=>{console.log(`server started at ${port}`)});
