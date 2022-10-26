const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    filePath:{type:String,required:false},
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    phone_no:{type:Number},
    photo:{type:String},
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
}, { timestamps: true }));

module.exports = User;