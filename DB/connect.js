const mongoose = require('mongoose')
const url = require('../url')
const connectDB = async () =>{
    try{
        await mongoose.connect(url)
        console.log('DB Connected.')
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB