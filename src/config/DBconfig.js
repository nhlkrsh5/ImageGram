import mongoose from "mongoose";
import { CONN } from "../config/serverConfig.js";
import dns from "dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

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