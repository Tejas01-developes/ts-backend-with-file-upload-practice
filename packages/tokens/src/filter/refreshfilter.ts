import {  Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { accesstoken } from '../tokengenerator/generatetoken.js';


export const refreshfilter=(req:Request,resp:Response)=>{
    const refreshh:string=req.cookies.refresh;

    if(!refreshh){
        return resp.status(400).json({success:false,message:"no refresh token"})
    }
    try{
    const decode=jwt.verify(refreshh,process.env.REFRESH_KEY as string) as JwtPayload

const newaccess=accesstoken(decode.id)
return resp.status(200).json({success:true,access:newaccess})
    
}catch(err){
    return resp.status(400).json({success:false,message:"refresh filter failed"})
}
}