import express from 'express';
import dbconnection from '@packages/databaseconnect';
import dotenv from 'dotenv';
import route from './routes/route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(express.json());
app.use("/apis", route);
app.listen(3000, async () => {
    await dbconnection.connect();
    console.log("server started on the port 3000");
});
//# sourceMappingURL=app.js.map