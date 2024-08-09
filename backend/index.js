import  express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute  from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cors from 'cors';



dotenv.config({})
const app= express();

const PORT = process.env.PORT|| 4000;
// middleawares


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const coreOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(coreOptions));
// // routes


app.use('/api/v1/user',userRoute);
app.use("/api/v1/message",messageRoute);

// // http://localhost:4000/api/v1/user/register



    app.listen(PORT, () => {
        connectDB();
        console.log(`Server is running on port ${PORT}`);

    });

