import { createPost as createNewPost,SearchPost,GetPosts,DeletePost,UpdateSpecificPost, GiveLikeOnPost, AddCommentOnPost, AddLikesOnComment } from "../service/PostService.js";
//import { findAllPost } from "../repositories/postRepository.js";
//import { awss3 } from "../config/awsConfig.js";
//findAllPostDocument

export async function createPost(req,res) {

    console.log(req.file);
    console.log("Body:",req.body);
    const userDetail = req.user;
    console.log("UserPost:",userDetail);
    

    const post = await createNewPost({
        caption: req.body.caption,
        image: req.file.path,
        id: req.user.id
    });

    return res.json({success: true,message: "file uploaded",data: post});
}

export const AllData = async (req,res) => {
     //Fetch all data and count all documents
    const limit = req.query.limit;  // get query params
    const offset = req.query.offset; //get query params
    ///const count = await findAllPostDocument();
    try {
        const data = await GetPosts(limit,offset);
        //console.log("come from AllData",data);
        
        return res.json({
            success: true,
            message: "data fetch successfully",
            data: data
        });
    } catch (error) {
        console.log("Something went wrong!",error);  
    }
    
}

export const post = async (req,res) => {
    const {id} = req.params;
    try {
        const data = await SearchPost(id);
        if(data){
            res.json({
            success: true,
            message: "found",
            data: data
         });
        }else{
            res.json({
            success: true,
            message: "not found",
            data: data
         });
        }
    } catch (error) {
        console.log("Something went wrong!"+error); 
    }     
}

export const DeletePostController = async (req,res) => {
    try {
        const {id} = req.params;

        const user_id = req.user.id;
        console.log("Delete POst",req.user);
        console.log("Delete USer",user_id);

        const post = await DeletePost(id,user_id);
        
        if(post){
            res.json({
                success: true,
                message: "post deleted",
                data: post
            });
        }else{
            res.status(400).json({
            success: false,
            message: "post not found",
            data: post
         });
        }
    } catch (error) {
        console.log("Something went wrong!"+error);
        if(error.status){
            res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        res.status(400).json({
                success: false,
                message: "Internal server error",
        });
    }
}

export const UpdatePostController = async (req,res) => {
    const {id} = req.params;
    const {cap} = req.body;
    const url = req.file.location;    
    console.log(cap,url);

    const user = req.user;
   // console.log("Delete POst",req.user);
    //console.log("Delete USer",user_id);
    
    try {
        const data = await UpdateSpecificPost(id,cap,url,user);

        res.json({
            success: true,
            message: "post Updated",
            data: data
        });
        
    } catch (error) {
        console.log("Something went wrong!"+error);
        if(error.status){
            res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        res.status(400).json({
            success: false,
            message: "Internal server errror",
        });
    }
    
}

export const LikesOnPost = async(req,res)=>{
    
    const user = req.user.id;
    const postId = req.params.postId;
    try {
        const response =  await GiveLikeOnPost(postId,user);
        console.log(user);
        console.log("post id:",postId);
        
        res.json({
            success: true,
            message: response.message,
            data: response.data
        });
    } catch (error) {
        /*if(error.status){
            res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        res.status(400).json({
            success: false,
            message: "Internal server errror",
        });*/
        console.log("controller layer:"+error);
    }
}

export const CommentOnPost = async (req,res)=>{
    const postId = req.params.postId;
    const user = req.user.id;
    const content = req.body.content

    console.log("USer:",user);
    console.log("post",postId);
    console.log("content",content);
    
    try {
        const commet = await AddCommentOnPost(postId,user,content)
       
        if (commet) {
            res.json({
                success: true,
                data: commet,
                message: "Comment post"
            });
        }
        
        
    } catch (error) {
        console.log("Controller",error);
        
    }    
        
}

export const LikesOnComments = async(req,res)=>{

    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const user = req.user.id;
    try {
        console.log(postId);
        console.log(user);
        console.log(commentId);
        
        const data = await AddLikesOnComment(postId,commentId,user);

        if(data){
            res.status(data.status).json({
                success: true,
                message: data.message,
                data: data.data
            });
        }
           
    } catch (error) {
        console.log("Controller:",error);
        
    }
    
}