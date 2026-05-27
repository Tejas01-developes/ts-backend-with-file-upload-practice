import mongoose from "mongoose";

const schema2=new mongoose.Schema({

tokenid:{
    type:String,
    required:true,
    unique:true
},
useridid:{
    type:String,
    required:true,
    unique:true
},
refreshtoken:{
    type:String,
    required:true,
    unique:true
},
added_at:{
    type:Date,
    default:Date.now()
},
expired_at:{
    type:Date,
   required:true
    },


})

const tokencollection2=mongoose.model("token",schema2);

export default tokencollection2