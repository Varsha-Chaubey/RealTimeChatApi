const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 4,
        max: 20,

    },
    userEmail: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    userPassword: {
        type: String,
        required: true,
        min: 8,
       
    },
   
})
module.exports = mongoose.model('Users',userSchema)