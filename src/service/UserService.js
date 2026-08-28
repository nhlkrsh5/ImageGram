import { GetUserPost } from "../repositories/postRepository.js";
import { BanAUserByID, createUser, DeleteSpecificUser, findAllUser, findUserByEmail } from "../repositories/userRepository.js";
import {generateTocken} from "../utils/jwt.js"
import bcrypt from "bcrypt";

export const userSignup = async(userObj)=>{
    try {
        const data = await createUser(userObj);
        return data;
    } catch (error) {
        console.log("Service Errorr:"+error.code);
        if(error.code == 11000){
            throw {
                status: 400,
                messeage: "email or username already exist!"
            }
        }  
        throw error; 
    }
}

export const UserVerify = async(userObj)=>{

    const email = userObj.email;
    const plainPass = userObj.password;
    try {
        const data = await findUserByEmail(email);
        

        if (!data) {
            console.log("Service:Data not found");
            throw {
                status: 400,
                messeage: "User not found!"
            }
        }else{
            //console.log("plainPass:", plainPass, "hashedPass:", data.password);
            const result = await bcrypt.compare(plainPass,data.password);
        
            if(result){
                console.log("Data:",data);
                
                    const token = await generateTocken({
                        id: data._id,
                        email: data.email,
                        username: data.username,
                        role: data.role || "user"
                    });
                    return token;
                }else{
                   throw {
                        status: 400,
                        messeage: "Password is incorrect"
                    }
                }
        }
    } catch (error) {
        console.log("Error:",error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const users = await findAllUser();
        return users;
    } catch (error) {
        console.log("Service Errorr:"+error);

    }   
}

export const userExist = async (email) => {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        console.log("Something went wrong!");
        
    }
}

export const findUserSpost = async (id) => {
    try {
        const resposns = await GetUserPost(id);
        return resposns;
    } catch (error) {
        console.log("Something went wrong!",error);   
    }
}

export const UserDelete = async (id) => {
    try {
        const response = await DeleteSpecificUser(id);
        return response;
    } catch (error) {
        console.log("Something went wrong!",error);  
    }
}

export const BanUserPost = async(id)=>{
    try {
        const response = await BanAUserByID(id);
        return response;
    } catch (error) {
        console.log("Something went wrong!",error); 
    }
}