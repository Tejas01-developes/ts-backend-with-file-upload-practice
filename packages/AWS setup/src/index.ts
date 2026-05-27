import { S3Client } from "@aws-sdk/client-s3";

export const s3client=new S3Client({
    region:process.env.REGION as string,
    credentials:{
        accessKeyId:process.env.ACCESS_KEY as string,
        secretAccessKey:process.env.SECRET_KEY as string
    }
})