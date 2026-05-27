import express from 'express';
import dbconnection from '@packages/databaseconnect';
import dotenv from 'dotenv';
import route from './routes/route.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    allowedHeaders: "Authorization",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use("/apis", route);
app.listen(3000, async () => {
    await dbconnection.default.connect();
    console.log("server started on the port 3000");
});
//# sourceMappingURL=app.js.map