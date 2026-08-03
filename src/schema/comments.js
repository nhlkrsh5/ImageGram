import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        maxLength: 50
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},{timestamps: true});

const comments = mongoose.model("Comments",commentSchema);

export default comments;