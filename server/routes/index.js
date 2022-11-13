var express = require('express');
var router = express.Router();
const postController=require('../controllers/post.controller');
const commentController=require('../controllers/comment.controller');
const userController=require('../controllers/user.controller');
const requestController=require('../controllers/request.controller');
const friendsController=require('../controllers/friends.controller');
const likesController=require('../controllers/likes.controller');
const {upload}=require('../middleware/multer');
const {imageUpload}=require('../middleware/multer');
const auth=require('../middleware/auth');

/* GET home page. */
router.post('/user/signUp',userController.signUp);
router.post('/user/signIn',userController.signIn);
router.get('/user/list',auth.verifyToken,userController.List);
router.get('/user/view',auth.verifyToken,userController.view);
router.get('/user/profile',auth.verifyToken,userController.profile);
router.put('/user/edit',auth.verifyToken,userController.editProfile);
router.delete('/user/delete',auth.verifyToken,userController.deleteUser);

router.post('/uploadProfile',imageUpload.single('image'),userController.fileupload);
router.delete('/removeProfile',auth.verifyToken,userController.removeFile);

router.post('/user/checkemail',userController.checkEmail);
router.post('/user/sendotp',userController.sendotp);
router.post('/user/sendotpMail',userController.sendotpMail);
router.post('/user/resetPassword',userController.resetPassword);

router.post('/post/create',auth.verifyToken,postController.createPost);
router.get('/post/list',auth.verifyToken,postController.List);
router.get('/post/myposts',auth.verifyToken,postController.MyPosts);
router.delete('/post/delete',auth.verifyToken,postController.deletePost);
router.post('/uploadImage',imageUpload.single('image'),postController.fileupload);

router.post('/comment/create',auth.verifyToken,commentController.createComment);
router.get('/comment/list',auth.verifyToken,commentController.List);
router.delete('/comment/delete',auth.verifyToken,commentController.remove);

router.post('/request/create',auth.verifyToken,requestController.createRequest);
router.get('/request/list',auth.verifyToken,requestController.pendingRequest);
router.get('/request/accept',auth.verifyToken,requestController.removePending);
router.get('/request/reject',auth.verifyToken,requestController.rejectPending);

router.get('/friends/list',auth.verifyToken,friendsController.List);
router.get('/friends/unfriend',auth.verifyToken,friendsController.Unfriend);

router.post('/like/create',auth.verifyToken,likesController.createLike);
router.get('/like/destroy',auth.verifyToken,likesController.unLike);
router.get('/like/list',auth.verifyToken,likesController.likeList);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
