const  mongoose  = require('mongoose')
const postMessage = require('../models/postMessage.js')
const { post } = require('../routes/posts.js')

const getPosts = async (req, res) =>{
    try {
        const postMessages = await postMessage.find()

        res.status(200).json(postMessages)

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPost = async (req, res) =>{
    const post = req.body
    const newPost = new postMessage(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

const updatePost = async (req, res) =>{
    const {id: _id} = req.params
    const post = req.body
    //check if id valid or not
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post with that id')
    }

   const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})

   res.json(updatedPost)
}

const deletePost = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No Post with that id')
    }

    await postMessage.findByIdAndRemove(id)
    console.log('delete');
    res.json({message: 'Post has been deleted..!'})
}

const likePost = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id')
    }

    const post = await postMessage.findById(id)

    const updatedPost = await postMessage.findByIdAndUpdate(id,  {likeCount: post.likeCount + 1}, {new: true})
    res.json(updatedPost)
}

module.exports = {getPosts, createPost, updatePost, deletePost, likePost}