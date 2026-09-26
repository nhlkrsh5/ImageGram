//import aws from "aws-sdk";
import aws from "@aws-sdk/client-s3";
import { S3Client,ListBucketsCommand } from "@aws-sdk/client-s3";
import {regios, Aceess_Key,Secrate_access_key } from "../config/serverConfig.js";
import {v2 as cloudinary} from "cloudinary";
import {Cloud_name,Cloud_api_key,Cloud_secret_key} from "../config/serverConfig.js"

console.log("Key:",Aceess_Key,":Regions:",regios);
console.log("Secrate access key:",Secrate_access_key);

cloudinary.config({
    cloud_name: Cloud_name,
    api_key: Cloud_api_key,
    api_secret: Cloud_secret_key
});

export {cloudinary}
/*export const awss3 = new S3Client({
    region: regios,
    credentials:{
        accessKeyId: Aceess_Key,
        secretAccessKey: Secrate_access_key
    }
})*/



