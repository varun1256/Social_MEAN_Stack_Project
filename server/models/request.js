const mongoose = require('mongoose');

const Request = mongoose.model('Request', new mongoose.Schema({
    createdBy: { type:mongoose.Schema.Types.ObjectId,ref:'User' },
    deliver_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    done: { type: Boolean }
}, { timestamps: true }));

module.exports = Request;