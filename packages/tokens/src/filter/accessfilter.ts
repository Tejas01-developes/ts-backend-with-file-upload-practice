import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface customrequest extends Request{
    id?:string
}
export const accessfilter=(req:customrequest,resp:Response,next:NextFunction)=>{
const token=req.headers.authorization;
const access=token?.split(" ")[1]

if(!access){
    return resp.status(400).json({success:false,message:"no access token"})
}
try{
const decode=jwt.verify(access,process.env.ACCESS_KEY as string) as JwtPayload

req.id=decode.id
next()
}catch(err){
return resp.status(400).json({success:false,message:"access filter failed"})
}
}