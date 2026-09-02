import mongoose from "mongoose";
import { maxLength } from "zod";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
    },
    password:{
        type: String,
        required: true,
        minLength: 5
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin","user"]
    },
    status:{
        type: String,
        default: "Active",
        enum: ["Actice","Inactive"]
    }
},{timestamps: true});

userSchema.pre('save',function (){
    const user = this;

    const SALT = bcrypt.genSaltSync(9);
    const hasedpass = bcrypt.hashSync(user.password,SALT);
    user.password = hasedpass;
});

userSchema.post('validate', function() {
  console.log('this gets printed second');
});

const user = mongoose.model("User",userSchema);
export default user;