import { Schema, model } from "mongoose";

const PostSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    creator: {
        type: String
    },
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

export default model('Post', PostSchema)

//const Post = mongoose.mode('Post, PostSchema)
//export default Post