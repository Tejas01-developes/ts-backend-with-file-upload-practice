
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

class dbconnection{

private database:string;

constructor(){
    this.database=process.env.DB_URL as string
    
}

async connect(){
    try{
        await mongoose.connect(this.database);
        console.log("database connected")
}catch(err){
throw new Error("database connection failed")
}
}

}

export default new dbconnection()