import express from "express"
import Post from "../models/Post.js"

const getPosts = async (req, res = express.response) => {
    try {
        const posts = await Post.find()
        
        res.status(200).json({
            ok: true,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    }
}

const createPost = async (req, res = express.response ) =>{
    const post = req.body

    const newPost = new Post(post)
    try {
        await newPost.save()
        res.status(201).json({
            ok: true,
            msg: 'Post create success.',
            posts: newPost
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    }
} 

const updatePost = async (req, res = express.response ) =>{
    const { id: postId } = req.params

    try {
        const post = await Post.findById(postId)

        if( !post ){
            return res.status(404).json({
                ok: false,
                msg: 'Post con ese ID no existe.'
            })
        }

        const updatedPost = await Post.findByIdAndUpdate( postId, req.body, { new: true})

        res.status(200).json({
            ok: true,
            msg: 'Post edited',
            post: updatedPost
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error.message

        })
    }
} 

const deletePost = async (req, res = express.response ) =>{
    const { id: postId } = req.params
    try {
        const post = await Post.findById(postId)

        if( !post ){
            return res.status(404).json({
                ok: false,
                msg: 'Post con ese ID no existe.'
            })
        }

        await Post.findByIdAndDelete(postId)
        res.status(200).json({
            ok: true,
            msg: 'Post deleted'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    }
}

const likePost = async (req, res = express.response ) =>{
    const { id: postId } = req.params
    try {
        const post = await Post.findById(postId)

        if( !post ){
            return res.status(404).json({
                ok: false,
                msg: 'Post con ese ID no existe.'
            })
        }

        const updatedPost = await Post.findByIdAndUpdate( postId, { $inc: { likeCount: 1 } }, { new: true})

        res.status(200).json({
            ok: true,
            msg: 'Post liked',
            post: updatedPost
        })
        
    } catch (error) {
        console.log(error)
    }
}

export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}