//import aws from "aws-sdk";
import aws from "@aws-sdk/client-s3";
import { S3Client,ListBucketsCommand } from "@aws-sdk/client-s3";
import {regios, Aceess_Key,Secrate_access_key } from "../config/serverConfig.js";

console.log("Key:",Aceess_Key,":Regions:",regios);
console.log("Secrate access key:",Secrate_access_key);

export const awss3 = new S3Client({
    region: regios,
    credentials:{
        accessKeyId: Aceess_Key,
        secretAccessKey: Secrate_access_key
    }
})



