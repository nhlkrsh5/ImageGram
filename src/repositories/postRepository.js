import Post from "../schema/post.js"; //  Post Schema


export const createNewPost = async (caption, image, user) => {
    try {
        /**
         * const newPost = new Post({caption,media_URL,comment,user_id,media_type});
         * await newPost.save();
         */
        const newPost = await Post.create({ caption, image, user });
        return newPost;
    } catch (error) {
        console.log("Repository:", error);

    }
}

export const findOnepost = async (id) => {
    try {
        let post = await Post.findById(id).populate("user", "username email");;
        return post;
    } catch (error) {
        console.log(error);

    }
}

export const findAllPosts = async (limit, offset) => {
    try {
        const posts = await Post.find().sort({ createdAt: 1 })
            .skip(offset)
            .limit(limit)
            .populate("user", "username email");

        const NoOfPosts = await findAllPostcount();
        return { posts, NoOfPosts };
    } catch (error) {
        console.log(error);
    }
}

export const findAllPostcount = async () => {
    try {
        const countDocs = await Post.countDocuments();
        return countDocs;
    } catch (error) {
        console.log("Somthing went wrong!", error);
    }
}

export const deleteSpecificPost = async (p_id) => {
    try {
        const post = await Post.findByIdAndDelete(p_id);

        return post;

    } catch (error) {
        console.log("Delete Something went wrong!" + error);

    }
}

export const updatePost = async (id, cap, imageUrl) => {
    try {
        const updatedPost = await Post.findOneAndUpdate({ _id: id }, { caption: cap, image: imageUrl }, { new: true });
        return updatedPost;
    } catch (error) {
        console.log("Something went wrong!" + error);
    }
}

export const GiveLikes = async (post, user) => {
    try {

        const data = await Post.findByIdAndUpdate(post, { $push: { likes: user } }, { new: true });
        return data;
    } catch (error) {
        //throw error;
        console.log("Respository layer:" + error);
    }
}

export const AddCommets = async (postId, user, con) => {
    try {
        const data = await Post.findByIdAndUpdate(postId, { $push: { comments: { content: con, user: user } } }, { new: true });
        return data;
    } catch (error) {
        console.log("Respository layer:" + error);
    }
}

export const GiveLikesOnComment = async (postId, commentId, user) => {
    try {
        const data = await Post.findOneAndUpdate(
            { _id: postId, "comments._id": commentId },
            { $push: { "comments.$.likes": user } },
            { returnDocument: "after" }
        );

        return data;
    } catch (error) {
        throw error;
    }
}

export const IsUserLikesOnPost = async (postId, commentId) => {
    try {
        const post = await Post.findOne({
            _id: postId,
            "comments._id": commentId
        },
            "comments");

        return post;
    } catch (error) {
        throw error;
    }
}

export const GetUserPost = async (userId) => {
    try {
        const posts = await Post.find({user: userId }).populate("user");
        return posts;
    } catch (error) {
        throw error;
    }
}
/*
export const deletePost = (id)=>{
    try {
        const data = await Post.findByIdAndDelete(id);
        return data;
    } catch (error) {
        console.log(error);
        
    }
}*/