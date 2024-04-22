const mongoose = require('mongoose')

const user = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    maidenName:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    role:{
        type: String
    }
}, {collection: 'users'})

module.exports = mongoose.model('user', user)