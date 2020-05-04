const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    lvl: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post