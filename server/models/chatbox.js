const mongoose = require('mongoose');

const Chat = mongoose.model('Chat', new mongoose.Schema({
    room: {type:String},
  nickname: {type:String},
  message: {type:String},
  updated_at: { type: Date, default: Date.now },
}, { timestamps: true }));

module.exports = Chat;