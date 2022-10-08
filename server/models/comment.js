const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', new mongoose.Schema({
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true }));

module.exports = Comment;