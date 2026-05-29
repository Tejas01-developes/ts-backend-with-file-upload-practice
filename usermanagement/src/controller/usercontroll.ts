import { Request, RequestHandler, Response } from "express"
import collection1 from "../schemas/schema1.js"
import bcrypt from 'bcrypt';
import  { accesstoken, refreshtoken } from '@packages/tokens'
import tokencollection2 from "../schemas/tokenschema.js";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {s3client} from '@packages/AWS setup'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import doccollection from "../schemas/docscgema.js";
dotenv.config();


export const registeruser:RequestHandler=async(req,resp)=>{
const{name,email,password}=req.body as{
    name:string,
    password:string,
    email:string,
    
}

if(!name || !email || !password){
    return resp.status(400).json({success:false,message:"body is not there"})
}
try{
    const hash=await bcrypt.hash(password,10)
    const userid:string=crypto.randomUUID()
await collection1.create({userid,name,email,password:hash})
return resp.status(200).json({success:true,message:"user registered"})
}catch(err){
    return resp.status(400).json({success:false,message:"registration failed"})
}
}


export const loginuser:RequestHandler=async(req,resp)=>{
    const{email,password}=req.body as{
       
        password:string,
        email:string
    }

    if(!email || !password){
        return resp.status(400).json({success:false,message:"body is not there"})
    }
    try{
   const res= await collection1.findOne({email})
   if(!res){
    return resp.status(400).json({success:false,message:"result is empty"})
   }
   const compare=await bcrypt.compare(password,res.password)
   if(!compare){
    return resp.status(400).json({success:false,message:"password is incorrect"})
   }
   const id=res.userid
   
   const accesstkn:string=accesstoken(id)
   let refresh:string;
const tokenres=await tokencollection2.findOne({useridid:id})
if(!tokenres){
    console.log("new entry token")
    refresh=refreshtoken(id)
    const tokenid=crypto.randomUUID();
    await tokencollection2.create({tokenid,useridid:id,refreshtoken:refresh,added_at:Date.now(),expired_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
}else{
    console.log("came here")
const now=Date.now();
const expired_time=tokenres.expired_at
if(now > expired_time.getTime() ){
    refresh=refreshtoken(id)
   await tokencollection2.updateOne({useridid:id},{$set:{refreshtoken:refresh,added_at:Date.now(),expired_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}})
}else{
refresh=tokenres.refreshtoken
}
}
resp.cookie("refresh",refresh,{
    httpOnly:true,
    sameSite:"lax",
    secure:true,
    path:"/"
})
    return resp.status(200).json({success:true,message:"login succesfully done",accesstkn})

    }catch(err){
        console.log("error",err)
        return resp.status(400).json({success:false,message:"login failed"})
    }
    }


    export const getusers:RequestHandler=async(req,resp)=>{
        try{
            const res=await collection1.find();
            if(!res){
                return resp.status(400).json({success:false,message:"result is empty"})
            }
            return resp.status(200).json({success:true,message:res})
        }catch(err){
           return resp.status(400).json({success:false,message:"get users failed"})
        }
    }


    
    // export const geturl=async(req:Request,resp:Response)=>{
    //     const{filename,filetype}=req.query as {
    //         filename:string,
    //         filetype:string
    //     };
    //     if(!filename || !filetype){
    //         return resp.status(400).json({success:false,message:"filename and filetype is not there"})
    //     }
    //     const uniquename=Date.now() + "_" + filename
    //     try{
    //     const command=new PutObjectCommand({
    //         Bucket:process.env.BUCKET_NAME as string,
    //         Key:uniquename,
    //         ContentType:filetype
    //     })

    //     const uploadurl=await getSignedUrl(s3client,command,{expiresIn:300})
      
    //     return resp.status(200).json({success:true,uploadurl,uniquename})
    // }catch(err){
    //     console.log(err)
    //     return resp.status(400).json({success:false,message:"upload failed"})
    // }
    // }





//     interface idreq extends Request{
//         id?:string
//     }
// export const dbindoc=async(req:idreq,resp:Response)=>{
// const{filename,filetype}=req.body as {
// filename:string,
// filetype:string
// }

// if(!filename || !filetype){
//     return resp.status(400).json({success:false,message:"filename and filetype is not there"}) 
// }
// const userid=req.id
// if(!userid){
//     return resp.status(400).json({success:false,message:"user id is not there"})
// }
// console.log(userid)
// try{
// await doccollection.create({userid,key:filename,filetype})
// return resp.status(200).json({success:true,message:"metadata in the db"})
// }catch(err){
//     return resp.status(400).json({success:false,message:"db metadata insertion failed"})
// }
// }