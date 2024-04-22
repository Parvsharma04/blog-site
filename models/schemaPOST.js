const mongoose = require('mongoose')
const author = require('../src/routes/author')

const POST = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'title is required'],
        trim: true
    },
    article:{
        type: String,
        required: [true, 'post is required'],
    },
    image:{
        type: String
    },
    articleId: {
        type: Number
    },
    date:{
        type: Date
    },
    author:{
        type: String
    },
    authorId:{
        type: Number
    }
}, {collection: 'posts'})

module.exports = mongoose.model('entry', POST)