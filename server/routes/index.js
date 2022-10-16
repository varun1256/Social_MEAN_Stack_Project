var express = require('express');
var router = express.Router();
const postController=require('../controllers/post.controller');
const commentController=require('../controllers/comment.controller');
const userController=require('../controllers/user.controller');
const auth=require('../middleware/auth');

/* GET home page. */
router.post('/user/signUp',userController.signUp);
router.post('/user/signIn',userController.signIn);
router.get('/user/list',userController.List);

router.post('/post/create',auth.verifyToken,postController.createPost);
router.get('/post/list',auth.verifyToken,postController.List);

router.post('/comment/create',auth.verifyToken,commentController.createComment);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
