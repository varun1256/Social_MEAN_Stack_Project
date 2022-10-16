const { User } = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../lib/logging');
const e = require('express');

const signUp = async (req, res) => {
    console.log('3');
    if (!(req.body.email && req.body.password && req.body.first_name && req.body.last_name && req.body.phone_no)) {
        logger.error("User-Controller :All items are required");
        return ReE(res, "User-Controller:All itemns are required");
    }
    [err, oldUser] = await to(User.findOne({ email: req.body.email }));
    if (oldUser) {
        return ReE(res, "User-Controller:User Already Exhist");
    }
    [err, encryptedPassword] = await to(bcrypt.hash(req.body.password, 10));
    if (err) {
        logger.error("User-Controller :Password is not encrypted");
        return ReE(res, "User-Controller:Password is not encrypted");
    }
    [err, user] = await to(User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(), // sanitize: convert email to lowercase
        phone_no: req.body.phone_no,
        password: encryptedPassword,
    }));
    if (err) {
        logger.error("User-Controller :Error in creating user");
        return ReE(res, "User-Controller:Error in creating user");

    }
    email = req.body.email
    let token = jwt.sign(
        { user_id: user._id, email },
        'secret',
        {
            expiresIn: "2h",
        }
    );
    if (err) {
        logger.error("User-Controller :Error in creating token");
        return ReE(res, "User-Controller:Error in creating token");

    }
    user.token = token;
    [err, user] = await to(user.save());
    if (err) {
        logger.error("User-Controller :Error in saving user");
        return ReE(res, "User-Controller:Error in saving user");
    }
    return ReS(res, { message: "Successfully Created User",user: user }, 201);
}
module.exports.signUp = signUp;

const signIn = async (req, res) => {
    let token
    if (!(req.body.email && req.body.password)) {
        logger.error("User-Controller:Mail and password is required");
        return ReE(res, "User-Controller:Mail and Password is required");
    }
    [err, user] = await to(User.findOne({ email: req.body.email }));
    if (!user) {
        return ReE(res, "User Not found!! Please SignUp");
    }
    if(await bcrypt.compare(req.body.password,user.password)){
       
    }else{
        return ReE(res, "Password is Incorrect");
    }
        // Create token
        email = req.body.email
        token = jwt.sign(
            { user_id: user._id, email },
            'secret',
            {
                expiresIn: "2h",
            }
        );

    user.token = token;
    [err, user] = await to(user.save());
    if (err) {
        logger.error("User-Controller :Error in saving user");
        return ReE(res, "User-Controller:Error in saving user");
    }
    return ReS(res, { message: "Successfully LoggedIn", user: user }, 201);

}
module.exports.signIn=signIn;

const List=async(req,res)=>{
    if(!req.user.user_id){
      logger.error("User-Controller :User is not authenticated");
          return ReE(res, "User-Controller:User is not authenticated");
    }
    [err,userList]=await to(User.find().sort({createdAt:-1}).limit(2).skip(4));
    
    if(err){
      logger.error("User-Controller :error in fetching User list");
          return ReE(res, "User-Controller:error in fetching User List");
    }
    return ReS(res, { message: "Successfully fetched user", userList: JSON.stringify(userList)}, 201);
  }
  module.exports.List=List;

