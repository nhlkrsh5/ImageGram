import multer from "multer";
import multerS3 from "multer-s3"
import { awss3 } from "./awsConfig.js";
import { bucket_name } from "./serverConfig.js";
console.log(bucket_name);

export const multerUpload = multer({
    storage: multerS3({
        s3: awss3,
        bucket: bucket_name,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key:function(req,file,cb){
            const uniquesufix = Date.now();
            console.log("Come from multercon:"+file.mimetype.split("/")[1]);
            
            cb(null,file.fieldname + "-" + uniquesufix + "-" +"."+ file.mimetype.split("/")[1]);
        }
    })
});
