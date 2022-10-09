const {Post}  = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require("../lib/logging");

const createPost= async(req,res)=>{
let err,post;
if(!req.user.user_id){
  logger.error("Post-Controller :User is not authenticated");
		return ReE(res, "Post-Controller:User is not authenticated");
}
if(!req.body.content){
    logger.error("Post-Controller :Content is required");
		return ReE(res, "Post-Controller:Content is required");
}
[err,post]=await to(Post.create(req.body));
if(err){
  logger.error("Post-Controller :error in creating post");
  return ReE(res, "Post-Controller:error in creating post");
}
post.user_id=req.user.user_id;
[err,post]=await to(post.save());
if(err){
  return ReE(res, "Post-Controller:Error in saving post");
}
if(err){
return ReE(res, err, 422);
}
return ReS(res, { message: "Successfully saved post", post: post}, 201);
}
module.exports.createPost=createPost;