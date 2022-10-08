var express = require('express');
var router = express.Router();
const postController=require('../controllers/post.controller');
const commentController=require('../controllers/comment.controller');

/* GET home page. */
router.post('/post/create',postController.createPost);
router.post('/comment/create',commentController.createComment);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
