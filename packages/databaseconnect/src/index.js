"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
class dbconnection {
    database;
    constructor() {
        this.database = process.env.DB_URL;
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.database);
            console.log("database connected");
        }
        catch (err) {
            throw new Error("database connection failed");
        }
    }
}
exports.default = new dbconnection();
//# sourceMappingURL=index.js.map