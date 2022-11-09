const { Chat } = require('../models');
const getChats=(req,res,next)=>{
        Chat.find({ room: req.params.room }, function (err, chats) {
          if (err) return next(err);
          res.json(chats);
        });
      
}
module.exports.getChats=getChats;

const saveChat=(req,res,next)=>{
        Chat.create(req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      
}
module.exports.saveChat=saveChat;
