const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    filePath:{type:String,required:false}
}, { timestamps: true }));

module.exports = Post;