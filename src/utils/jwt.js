import jwt from "jsonwebtoken";
import {my_secrate} from "../config/serverConfig.js"

//console.log("Tocken secrate:",my_secrate);

export const generateTocken = (payload)=>{
    console.log("Payload",payload);
    
    const result =  jwt.sign(payload,my_secrate,{expiresIn: "1d"});
    return result;
}

export const verifyJWTTocken = (token)=>{
    try {
        const result =  jwt.verify(token,my_secrate);
        return result;
    } catch (error) {
        throw error;
    }
}