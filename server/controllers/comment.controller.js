const { Comment } = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require("../lib/logging");
const { Post } = require('../models');
const { User } = require('../models');

const createComment = async (req, res) => {
    let err, comment;
    if (!req.body.content) {
        logger.error("Comment-Controller :Content is required");
        return ReE(res, "Comment-Controller:Content is required");
    }
    if (!req.body.post_id) {
        logger.error("Comment-Controller :Post Id is required");
        return ReE(res, "Comment-Controller:Post Id is required");

    }
    [err, comment] = await to(Comment.create(req.body));
    if (err) {
        logger.error("Comment-Controller :error in creating comment");
        return ReE(res, "Comment-Controller:error in creating comment");
    }
    comment.user_id = req.user.user_id;

    [err, comment] = await to(comment.save());
    if (err) {
        return ReE(res, "Comment-Controller:Error in saving comment");
    }

    let post
    [err, post] = await to(Post.findById(req.body.post_id));
    if (err) {
        return ReE(res, err, 422);
    }
    post.comments.push(comment._id);
    [err, savePost] = await to(post.save());

    return ReS(res, { message: "Successfully saved comment", comment: comment }, 201);
}
module.exports.createComment = createComment;

const List = async (req, res) => {
     if (!req.user.user_id) {
        logger.error("Comments-Controller :User is not authenticated");
        return ReE(res, "Comments-Controller:User is not authenticated");
    }
     [err, commentsList] = await to(Comment.find({ 'post_id': req.query.post_id}).sort({ createdAt: -1 }).limit(req.query.limit));
    if (err) {
        logger.error("Comments-Controller :error in fetching Comments list");
        return ReE(res, "Comments-Controller:error in fetching Comments List");
    }

    let commentJson = commentsList.map(comment => {
		return comment.toObject();
	});
	for (let index in commentJson) {
		[err, user] = await to(User.findById(commentJson[index].user_id));
		if (err) return ReE(res, err.message);

		commentJson[index].user = {
			name: user.first_name,
            lname: user.last_name,
            filePath:user.filePath
		
		};
        if(user._id==req.user.user_id){
            commentJson[index].self=true;
        }else{
            commentJson[index].self=false;
        }

	}

    return ReS(res, { message: "Successfully fetched Comments", commentsList: JSON.stringify(commentJson) }, 201);
}
module.exports.List = List;

const remove=async(req,res)=>{
    let post_id = req.query.post_id;
    let comment_id=req.query.comment_id;
    if (!req.user.user_id) {
        logger.error("Comments-Controller :User is not authenticated");
        return ReE(res, "Comments-Controller:User is not authenticated");
    }

    let post
    [err, post] = await to(Post.findById(post_id));
    if (err) {
        logger.error("Comments-Controller :Post is not found");
        return ReE(res, "Comments-Controller:Post is not found");
    }

    let comments1 = []
    for (let i = 0; i < post.comments.length; i++) {
        if (post.comments[i] != comment_id) {
            comments1.push(post.comments[i]);
        }
    }
    let size1 = post.comments.length;
    for (let i = 0; i < size1; i++) {
        post.comments.pop();
    }
    for (let i = 0; i < comments1.length; i++) {
        post.comments.push(comments1[i]);
    }
    [err, post] = await to(post.save());
    if (err) {
        return ReE(res, "Comments-Controller:Post is not saved");
    }
    await Comment.deleteOne({ '_id': comment_id });
    return ReS(res, { message: "Comment Successfully deleted" }, 201);
}
module.exports.remove=remove;