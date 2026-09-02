import { BanAUserProfile, BanUserPost, findUserSpost, getAllUsers, UserDelete, userSignup, UserVerify } from "../service/UserService.js";
import bcrypt from "bcrypt";

export const getProfile = (req,res)=>{

    if(req.user){
        res.json({
            message: "User found...",
            data: req.user
        });
    }else{
        res.json({
            message: "User not found...",
        });
    }
   
}

export const userRegistration = async(req,res)=>{
    console.log("Signup",req.body);  
    try {
        const data = await userSignup(req.body);

        return res.status(200).json({
            success: true,
            message: "Registered",
            data: data
        });
    } catch (error) {
        console.log("Something went wrong!"+error);
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.messeage,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server errro",
        });
    }  
}

export const UserSignIN = async(req,res)=>{

    try {
        const data = await UserVerify(req.body);
        
        if(data.messeage){
           res.json({
                message: data.messeage,
            });
           
        }
        else{
            res.json({
                success: true,
                message: "data found",
                data: data
            });
            
        }
        
    } catch (error) {
        console.log("Somethifg went wrong!",error);
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.messeage,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server errro",
        });
         
    }
}
export const AllUsers = async (req,res) => {
    try {
        const users = await getAllUsers();
        
        return res.status(200).json({
            success: true,
            message: "found success",
            data: users
        });
    } catch (error) {
        console.log("Something went wrong!"+error); 
    }
}

export const GetAllotsOfUser = async (req,res) => {

    const user = req.user.id;
    try {
        const data = await findUserSpost(user);
        res.json({
            success: true,
            messege: "Found",
            data: data
        })
    } catch (error) {
        console.log("Something went wrong!"+error);
    }
}

export const DeleteUser = async(req,res)=>{
    try {
        const id = req.params.id;

        const user = await UserDelete(id);

        if (user) {
            res.json({
                success: true,
                messege: "User deleted",
                data: user
            });
        }else{
            res.json({
                success: true,
                messege: "User Not found",
                data: null
            });
        }
       
    } catch (error) {
        console.log("Something went wrong!"+error);
    }
}

export const BanAPost = async(req,res)=>{
    try {
        const id = req.params.id;
        const post = await BanUserPost(id);

         if (post) {
            res.json({
                success: true,
                messege: "Post Banned",
                data: post
            });
        }else{
            res.json({
                success: true,
                messege: "Post Not found",
                data: null
            });
        }

    } catch (error) {
        console.log("Something went wrong!"+error);
    }
}

export const BanAUser = async (req,res) => {

    const id = req.params.id;
    try {

        const user = await BanAUserProfile(id);

        if (user) {
            res.json({
                success: true,
                messege: "Wroking",
                data: user
            });   
        }else{
            res.json({
                success: true,
                messege: "Not found",
                data: null
            });  
        }

    } catch (error) {
       console.log("Something went wrong:"+error);
        
    }
}