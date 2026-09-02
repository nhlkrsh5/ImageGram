//import user from "../schema/user.js";
import User from "../schema/user.js";
import post from "../schema/post.js";


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

export const DeleteSpecificUser = async (id) => {
    try {
        const data = await User.findByIdAndDelete(id);
        return data;
    } catch (error) {
        throw error;
    }
}

export const BanAUserByID = async (id) => {
    try {
        const data = await post.findByIdAndUpdate(
            id,
            {
                $set:{
                    caption: "Post Ban for upload sensitive content",
                    image: "https://firs-project-bucket-644.s3.eu-north-1.amazonaws.com/c_content.jpg"
                }
            },
            {new: true}
        );
        return data;
    } catch (error) {
        throw error;
    }
}

export const InActiveUser = async (id) => {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    status: "Inactive"
                }
            },
            {new: true}
        );
        return user;
    } catch (error) {
        throw error;
    }
}