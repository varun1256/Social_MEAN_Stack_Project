const { User } = require('../models');
const { Request } = require('../models');
const otpGenerator = require('otp-generator')
const twilioLib=require('../lib/twilio')
const { to, ReE, ReS } = require('../services/util.services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../lib/logging');
const e = require('express');
const fs = require('fs');

const signUp = async (req, res) => {
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
    return ReS(res, { message: "Successfully Created User", user: user }, 201);
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
    if (await bcrypt.compare(req.body.password, user.password)) {

    } else {
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
module.exports.signIn = signIn;

const List = async (req, res) => {
    if (!req.user.user_id) {
        logger.error("User-Controller :User is not authenticated");
        return ReE(res, "User-Controller:User is not authenticated");
    }
    [err, userList] = await to(User.find().sort({ createdAt: -1 }));

    if (err) {
        logger.error("User-Controller :error in fetching User list");
        return ReE(res, "User-Controller:error in fetching User List");
    }
    return ReS(res, { message: "Successfully fetched user", userList: JSON.stringify(userList) }, 201);
}
module.exports.List = List;

const view = async (req, res) => {

    if (!req.user.user_id) {
        logger.error("User-Controller :User is not authenticated");
        return ReE(res, "User-Controller:User is not authenticated");
    }
    let err, user, relation;
    [err, user] = await to(User.findById(req.query.id));
    if (err) {
        return ReE(res, "Request-Controller:User is not fetched");
    }
    user.toObject();
    relation = false;
    self = false;
    sent = false;
    reqsted = false;

    for (let i in user.friends) {
        if ((user.friends[i]) == req.user.user_id) {
            relation = true;
        }
    }

    if (user._id == req.user.user_id) {
        self = true;
    }
    let found
    [err, found] = await to(Request.find({ 'createdBy': req.user.user_id, 'deliver_to': req.query.id }));
    if (err) {
        logger.error("User-Controller :Error in finding Request");
        return ReE(res, "User-Controller:Error in finding Request");
    }
    if (found.length != 0) {
        sent = true;
    }

    let found2
    [err, found2] = await to(Request.find({ 'createdBy': req.query.id, 'deliver_to': req.user.user_id }));
    if (err) {
        logger.error("User-Controller :Error in finding Request");
        return ReE(res, "User-Controller:Error in finding Request");
    }
    if (found2.length != 0) {
        reqsted = true;
    }

    [err, user] = await to(user.save());

    if (err) {
        return ReE(res, "Request-Controller:User is not Saved");
    }

    return ReS(res, { message: "Successfully fetched Profile", user: user, relation: relation, self: self, sent: sent, reqsted: reqsted }, 201);
}
module.exports.view = view;

const profile = async (req, res) => {
    if (!req.user.user_id) {
        logger.error("User-Controller :User is not authenticated");
        return ReE(res, "User-Controller:User is not authenticated");
    }
    let err, user
    [err, user] = await to(User.findById(req.user.user_id));
    if (err) {
        return ReE(res, "Request-Controller:User is not fetched");
    }
    return ReS(res, { message: "Successfully fetched Profile", user: user }, 201);

}
module.exports.profile = profile;

const editProfile = async (req, res) => {
    if (!req.user.user_id) {
        logger.error("User-Controller :User is not authenticated");
        return ReE(res, "User-Controller:User is not authenticated");
    }
    let err, user
    [err, user] = await to(User.findById(req.user.user_id));
    if (err) {
        return ReE(res, "User-Controller:User is not fetched");
    }
    user.filePath = req.body.filePath;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.phone_no = req.body.phone_no;

    [err, user] = await to(user.save());
    if (err) {
        return ReE(res, "User-Controller:Error in saving updated user");
    }
    return ReS(res, { message: "Successfully updated Profile", user: user }, 201);
}
module.exports.editProfile = editProfile;

const fileupload = async (req, res) => {
    console.log('3', req.file)

    return ReS(res, { message: "File Uploaded Successfully", file: req.file }, 201);

}
module.exports.fileupload = fileupload;

const removeFile = async (req, res) => {
    let user
    [err, user] = await to(User.findById(req.user.user_id));
    if (err) {
        return ReE(res, err, 422);
    }
    fs.unlink(`${user.filePath}`, () => {
        console.log("test");
    });

    return ReS(res, { message: "Profile Photo Removed" }, 201);

}
module.exports.removeFile = removeFile;

const checkEmail = async (req, res) => {
    displayotp=false;
    if (!(req.body.email)) {
        logger.error("User-Controller :Email is required");
        return ReE(res, "User-Controller:Email is required");
    }
    let err,oldUser
    [err, oldUser] = await to(User.findOne({ email: req.body.email }));
    if (!oldUser) {
        return ReE(res, "User Doesn't Exhist");
    }
     displayotp=true;
    return ReS(res, { message: "Profile Photo Removed" ,displayotp : displayotp}, 201);
}
module.exports.checkEmail=checkEmail;

const sendotp=async(req,res)=>{
    if (!(req.body.email)) {
        logger.error("User-Controller :Email is required");
        return ReE(res, "User-Controller:Email is required");
    }
  let  OTP= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
   let err,user
   [err, user] = await to(User.findOne({ email: req.body.email }));
   if (err) {
       return ReE(res, "User-Controller:Error in finding User");
   }
   //user.phone_no= "+91"+user.phone_no;
   content='Your OTP for resetting Password :'+OTP;
  twilioLib.sendOTP(content,user.phone_no);
  return ReS(res, { message: "OTP sent" ,OTP:OTP}, 201);
}
module.exports.sendotp=sendotp;