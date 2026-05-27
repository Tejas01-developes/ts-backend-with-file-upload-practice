import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let memoryserver:MongoMemoryServer

export const connectdb=async()=>{
    memoryserver=await MongoMemoryServer.create();
    const uri=memoryserver.getUri()
    await mongoose.connect(uri)
}


export const cleardb=async()=>{
const collection=mongoose.connection.collections
for(const key in collection){
    await collection[key]?.deleteMany({})
}
}


export const closedb=async()=>{
  if(mongoose.connection.readyState !== 0){
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close()

    if(memoryserver){
        await memoryserver.stop()
    }
  }
}