import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    
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
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments:[{

        content: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    }]
},{timestamps: true});

const post = mongoose.model("Post",postSchema);

export default post;