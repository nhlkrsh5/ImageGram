import mongoose from "mongoose";
import { CONN } from "../config/serverConfig.js";

export default async function DBConnection() {
    console.log(CONN);
    
    try{
        await mongoose.connect(CONN);
        console.log("DBconfig-->Connection success");
        
    }catch(error){
        console.log("DBconfig-->Something went wrong",error);
        
    }
}
//DBConnection();