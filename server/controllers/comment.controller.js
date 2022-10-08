const {Comment}=require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require("../lib/logging");
const {Post}  = require('../models');

const createComment= async(req,res)=>{
    let err,comment;
    if(!req.body.content){
        logger.error("Comment-Controller :Content is required");
            return ReE(res, "Comment-Controller:Content is required");
    }
    if(!req.body.post_id){
        logger.error("Comment-Controller :Post Id is required");
            return ReE(res, "Comment-Controller:Post Id is required");

    }
    [err,comment]=await to(Comment.create(req.body));
    if(err){
    return ReE(res, err, 422);
    }
    let post
    [err,post]=await to(Post.findById(req.body.post_id));
    if(err){
        return ReE(res, err, 422);
    }
    post.comments.push(comment._id);
    [err,savePost]=await to(post.save());

    return ReS(res, { message: "Successfully saved comment", comment: comment}, 201);
    }
    module.exports.createComment=createComment;