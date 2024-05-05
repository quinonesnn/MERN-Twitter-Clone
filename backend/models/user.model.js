import mongoose from 'mongoose';
const { Schema } = mongoose

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            defaul: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            defaul: []
        }
    ],
    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "",
    },
    link:{
        type: String,
        default: "",
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;