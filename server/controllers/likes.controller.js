const { to, ReE, ReS } = require('../services/util.services');
const { Post } = require('../models');

const createLike = async (req, res) => {
    if (!req.user.user_id) {
        logger.error("Likes-Controller :User is not authenticated");
        return ReE(res, "Likes-Controller:User is not authenticated");
    }
    let err,post;
    [err, post] = await to(Post.findById(req.body.post_id));
    if (err) {
        logger.error("Likes-Controller :Post is not fetched");
        return ReE(res, "Likes-Controller:Post is not fetched");
    }
    let liked
    liked= post.likes.find((id)=>{return id==req.user.user_id});
    if(liked){
        return ReS(res, { message: "Already Liked" }, 201);
    }

    post.likes.push(req.user.user_id);
    [err, post] = await to(post.save());
    if (err) {
        return ReE(res, "Likes-Controller:Post is not saved");
    }
    return ReS(res, { message: "Liked" }, 201);
}
module.exports.createLike=createLike;

const unLike =async(req,res)=>{
    if (!req.user.user_id) {
        logger.error("Likes-Controller :User is not authenticated");
        return ReE(res, "Likes-Controller:User is not authenticated");
    }
    let err,post;
    [err, post] = await to(Post.findById(req.query.post_id));
    if (err) {
        logger.error("Likes-Controller :Post is not fetched");
        return ReE(res, "Likes-Controller:Post is not fetched");
    }


    let likes1 = []
    for (let i = 0; i < post.likes.length; i++) {
        if (post.likes[i] != req.user.user_id) {
            likes1.push(post.likes[i]);
        }
    }
    let size1 = post.likes.length
    for (let i = 0; i < size1; i++) {
        post.likes.pop();
    }
    for (let i = 0; i < likes1.length; i++) {
        post.likes.push(likes1[i]);
    }
    [err, post] = await to(post.save());
    if (err) {
        return ReE(res, "Likes-Controller:Post is not saved");
    }

    return ReS(res, { message: "Successfully  unliked" }, 201);
}
module.exports.unLike=unLike;


