import Comments from "../schema/comments.js";

export const AddComment = async (post,user,content) => {
    try {
        const data = await Comments.create({content,user,post}) ;
        return data;
    } catch (error) {
        throw error;
    }
}