var express = require('express');
var router = express.Router();
const postController=require('../controllers/post.controller');
const commentController=require('../controllers/comment.controller');
const userController=require('../controllers/user.controller');
const requestController=require('../controllers/request.controller');
const friendsController=require('../controllers/friends.controller');
const auth=require('../middleware/auth');

/* GET home page. */
router.post('/user/signUp',userController.signUp);
router.post('/user/signIn',userController.signIn);
router.get('/user/list',auth.verifyToken,userController.List);
router.get('/user/view',auth.verifyToken,userController.view);

router.post('/post/create',auth.verifyToken,postController.createPost);
router.get('/post/list',auth.verifyToken,postController.List);

router.post('/comment/create',auth.verifyToken,commentController.createComment);
router.get('/comment/list',auth.verifyToken,commentController.List);


router.post('/request/create',auth.verifyToken,requestController.createRequest);
router.get('/request/list',auth.verifyToken,requestController.pendingRequest);
router.get('/request/accept',auth.verifyToken,requestController.removePending);
router.get('/request/reject',auth.verifyToken,requestController.rejectPending);

router.get('/friends/list',auth.verifyToken,friendsController.List);
router.get('/friends/unfriend',auth.verifyToken,friendsController.Unfriend);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
