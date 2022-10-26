const { Post } = require('../models');
const { Comment } = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require("../lib/logging");
const { User } = require('../models');
const fs = require('fs');
const nodemailer = require('../lib/mailer/nodemailer');


const createPost = async (req, res) => {
  let err, post;
  if (!req.user.user_id) {
    logger.error("Post-Controller :User is not authenticated");
    return ReE(res, "Post-Controller:User is not authenticated");
  }
  if (!req.body.content) {
    logger.error("Post-Controller :Content is required");
    return ReE(res, "Post-Controller:Content is required");
  }
  [err, post] = await to(Post.create(req.body));
  if (err) {
    logger.error("Post-Controller :error in creating post");
    return ReE(res, "Post-Controller:error in creating post");
  }
  post.user_id = req.user.user_id;
  [err, post] = await to(post.save());
  if (err) {
    return ReE(res, "Post-Controller:Error in saving post");
  }
  if (err) {
    return ReE(res, err, 422);
  }
  let user
  [err, user] = await to(User.findById(req.user.user_id));
  if (err) {
    return ReE(res, err, 422);
  }
  let mailDetails={};
  mailDetails.to = user.email;
  mailDetails.subject='Post Creation';
  mailDetails.text='Your Post has been Created.Kindly report if it is not created by you';

  nodemailer.sendmail(mailDetails);

  return ReS(res, { message: "Successfully saved post", post: post }, 201);
}
module.exports.createPost = createPost;

const List = async (req, res) => {
  let friends = []
  if (!req.user.user_id) {
    logger.error("Post-Controller :User is not authenticated");
    return ReE(res, "Post-Controller:User is not authenticated");
  }
  let user;
  [err, user] = await to(User.findById(req.user.user_id));
  if (err) {
    logger.error("Post-Controller :User is not found");
    return ReE(res, "Post-Controller:User is not found");
  }

  for (let i = 0; i < user.friends.length; i++) {
    friends.push(user.friends[i]);
  }
  friends.push(req.user.user_id);

  [err, postList] = await to(Post.find({ 'user_id': { '$in': friends } }).sort({ createdAt: -1 }).limit(req.query.limit));
  if (err) {
    logger.error("Post-Controller :Postlist is not fetched");
    return ReE(res, "Post-Controller:Postlist is not fetched");
  }
  let postJson = postList.map(post => {
    return post.toObject();
  });
  for (let index in postJson) {
    [err, user] = await to(User.findById(postJson[index].user_id));
    if (err) return ReE(res, err.message);

    postJson[index].user = {
      name: user.first_name,
      lname: user.last_name,
      filePath: user.filePath

    };

  }
  for (let index in postJson) {
    let liked
    liked = postJson[index].likes.find((id) => { return id == req.user.user_id });
    if (liked) {
      postJson[index].liked = true;
    } else {
      postJson[index].liked = false;
    }
  }


  if (err) {
    logger.error("Post-Controller :error in fetching Post list");
    return ReE(res, "Post-Controller:error in fetching Post List");
  }
  return ReS(res, { message: "Successfully fetched post", postList: JSON.stringify(postJson) }, 201);
}
module.exports.List = List;

const MyPosts = async (req, res) => {
  if (!req.user.user_id) {
    logger.error("Post-Controller :User is not authenticated");
    return ReE(res, "Post-Controller:User is not authenticated");
  }
  let id = req.user.user_id;
  let showdelete = true
  if (req.query.id != 'undefined') {
    id = req.query.id;
    showdelete = false
  }
  [err, postList] = await to(Post.find({ 'user_id': id }).sort({ createdAt: -1 }).limit(req.query.limit));
  if (err) {
    logger.error("Post-Controller :Postlist is not fetched");
    return ReE(res, "Post-Controller:Postlist is not fetched");
  }
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
  for (let index in postJson) {
    let liked
    liked = postJson[index].likes.find((id) => { return id == req.user.user_id });
    if (liked) {
      postJson[index].liked = true;
    } else {
      postJson[index].liked = false;
    }
  }
  return ReS(res, { message: "Successfully fetched post", postList: JSON.stringify(postJson), showdelete: showdelete }, 201);

}
module.exports.MyPosts = MyPosts;

const deletePost = async (req, res) => {
  console.log('6');
  if (!req.user.user_id) {
    logger.error("Post-Controller :User is not authenticated");
    return ReE(res, "Post-Controller:User is not authenticated");
  }
  await Comment.deleteMany({ 'post_id': req.query.post_id });
  let post
  [err, post] = await to(Post.findById(req.query.post_id));
  if (err) {
    return ReE(res, err, 422);
  }
  if (post.filePath) {
    fs.unlink(`${post.filePath}`, () => {
      console.log("test");
    });
  }

  await Post.deleteOne({ '_id': req.query.post_id });
  return ReS(res, { message: "Post Successfully deleted" }, 201);
}
module.exports.deletePost = deletePost;

const fileupload = async (req, res) => {
  console.log('3', req.file)


  return ReS(res, { message: "File Uploaded Successfully", file: req.file }, 201);

}
module.exports.fileupload = fileupload