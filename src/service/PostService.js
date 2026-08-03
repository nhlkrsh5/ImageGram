/**const postSchema = new mongoose.Schema({
    
    caption:{
        type: String,
        min: 150,
    },
    image:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});
 */
//import { AddComment } from "../repositories/commentRepository.js";

import { AddCommets, createNewPost,findOnepost,deleteSpecificPost,findAllPosts, updatePost, GiveLikes, GiveLikesOnComment, IsUserLikesOnPost } from "../repositories/postRepository.js";

export const createPost = async(createPostObj)=>{
    const caption = createPostObj.caption;
    const image = createPostObj.image;
    const user = createPostObj.id;

    const data = await createNewPost(caption,image,user);
    return data;
}

export const SearchPost = async (id) => {
    try {
        const data = await findOnepost(id);

        return data;
    } catch (error) {
        console.log("Something went wrong!"+error);
        
    }
}

export const GetPosts = async (limit,offset) => {
    try {
        const posts = await findAllPosts(limit,offset);
        return posts;
    } catch (error) {
        console.log("Something went wrong!"+error);
    }
}

export const DeletePost = async (id,user) => {
    try {
        const post = await findOnepost(id);

        if(post.user._id != user){
            console.log("NOt authenticate");

            throw {
                status: 401,
                message: "Not valid user"
            }
            
        }else{
            const data = await deleteSpecificPost(id,user);
            return data;
        }
        
    } catch (error) {
        console.log("Something went wrong!"+error);
        throw error;
    }
}

export const UpdateSpecificPost = async (id,cap,imageUrl,user) => {
    try {
        //const post = await findOnepost(id);

        /*if(post.user._id != user){
            throw {
                status: 400,
                message: "Not authenticated user"
            }
        }else{
            
        }*/
       if(user.role != "admin"){
            throw {
                status: 401,
                message: "Only admin has permission to update"
            }
       }else{
            const updatedPost = await updatePost(id,cap,imageUrl);
            return updatedPost;
       }
       
        
    } catch (error) {
        console.log("Something went wrong!"+error);
        throw error;
    }
}

export const GiveLikeOnPost = async (postId,user)=>{
    try {

        const postExist = await findOnepost(postId);
        
        const alreadyLiked = postExist.likes.some(val => val==user);
        if(alreadyLiked){
           return {
                data: postExist,
                message: "ALready liked"
            }
        }else{
            const post = await GiveLikes(postId,user);
            return {
                data: post,
                message: "Liked"
            }
        }
       
        
    } catch (error) {
        console.log("Service layer:"+error);
        
    }
} 

export const AddCommentOnPost = async(postId,user,cotent)=>{
    try {
        const respons = await AddCommets(postId,user,cotent);
        return respons;
    } catch (error) {
        console.log("Something went wrong:"+error);
        
    }
}

export const AddLikesOnComment = async(postId,commentId,user)=>{
    try {
        //

        const isCommentLike = await IsUserLikesOnPost(postId,commentId);
        console.log("OBJ",isCommentLike);
        
        const comment = isCommentLike.comments.id(commentId);
        const isLike = comment.likes.some(val => val.toString() == user);
        

        if (isLike) {
            console.log("Already Like",isCommentLike);
            return {
                status: 400,
                message: "Already liked...",
                data: isCommentLike
            }
        }else{
            console.log("Not Already Like",isCommentLike);
            const response = await GiveLikesOnComment(postId,commentId,user);
            return {
                status: 200,
                message: "liked...",
                data: response
            }
        }
        
        
        //return response;
    } catch (error) {
        console.log("Something went wrong:"+error);
    }
}