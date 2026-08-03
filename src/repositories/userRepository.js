//import user from "../schema/user.js";
import User from "../schema/user.js";


export const createUser = async(userObj)=>{
    try {
        const user = await User.create(userObj);
        return user;
    } catch (error) {
        console.log("Repository Error:",error);
        throw error;
    }
}
export const findUserByEmail = async(email)=>{
   
    try {
        const data = await User.findOne({email});
        return data;
    } catch (error) {
        console.log("Error:",error);
        
    }
}

export const findAllUser = async()=>{
    
    try {
        //const data = await User.find({}).select({password:-1}); Only give password
        //const data = await User.find({}).select({username:1,email:1}); Only give username,email
        const data = await User.find({}).select({password:0}); //All data except password
        return data;
    } catch (error) {
         console.log("Error:",error);
    }
}