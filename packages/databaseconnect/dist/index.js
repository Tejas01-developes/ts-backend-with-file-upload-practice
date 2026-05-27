import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
class dbconnection {
    database;
    constructor() {
        this.database = process.env.DB_URL;
    }
    async connect() {
        try {
            await mongoose.connect(this.database);
            console.log("database connected");
        }
        catch (err) {
            throw new Error("database connection failed");
        }
    }
}
export default new dbconnection();
//# sourceMappingURL=index.js.map