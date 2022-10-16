const {Post}  = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require("../lib/logging");
const { User } = require('../models');

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

const List=async(req,res)=>{
  console.log('3');
  if(!req.user.user_id){
    logger.error("Post-Controller :User is not authenticated");
		return ReE(res, "Post-Controller:User is not authenticated");
  }
  [err,postList]=await to(Post.find().sort({createdAt:-1}).limit(req.query.limit));
  let postJson = postList.map(post => {
		return post.toObject();
	});
	for (let index in postJson) {
		[err, user] = await to(User.findById(postJson[index].user_id));
		if (err) return ReE(res, err.message);

		postJson[index].user = {
			name: user.first_name,
      lname: user.last_name
		
		};

	}

  if(err){
    logger.error("Post-Controller :error in fetching Post list");
		return ReE(res, "Post-Controller:error in fetching Post List");
  }
  return ReS(res, { message: "Successfully fetched post", postList: JSON.stringify(postJson)}, 201);
}
module.exports.List=List;
