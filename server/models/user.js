const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    email:{ type:String,required:true,unique:true},
    password:{ type:String,required:true},
    name:{type:String,required:true},
    photo:{type:String}
}, { timestamps: true }));

module.exports = User;