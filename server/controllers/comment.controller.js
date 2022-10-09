const { Comment } = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require("../lib/logging");
const { Post } = require('../models');

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