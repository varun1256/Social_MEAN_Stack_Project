const { Request } = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require("../lib/logging");
const { User } = require('../models');

const createRequest = async (req, res) => {
    if (!req.user.user_id) {
        logger.error("Request-Controller :User is not authenticated");
        return ReE(res, "Request-Controller:User is not authenticated");
    }
    if (!req.body.id) {
        logger.error("Request-Controller :Deliver user is required");
        return ReE(res, "Request-Controller:Deliver user is required");
    }
    const Reqt = new Request();
    Reqt.createdBy = req.user.user_id;
    Reqt.deliver_to = req.body.id;
    Reqt.done = false;
    let request, err
    [err, request] = await to(Reqt.save());
    if (err) {
        return ReE(res, "Request-Controller:Error in saving request");
    }
    return ReS(res, { message: "Successfully saved request", request: request }, 201);

}
module.exports.createRequest = createRequest;

const pendingRequest = async (req, res) => {
    if (!req.user.user_id) {
        logger.error("Request-Controller :User is not authenticated");
        return ReE(res, "Request-Controller:User is not authenticated");
    }
    [err, requestList] = await to(Request.find({ deliver_to: req.user.user_id }));
    let requestJson = requestList.map(request => {
        return request.toObject();
    });
    for (let index in requestJson) {
        [err, user] = await to(User.findById(requestJson[index].createdBy));
        if (err) return ReE(res, err.message);

        requestJson[index].user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email:user.email,
            filePath:user.filePath


        };

    }

    if (err) {
        return ReE(res, "Request-Controller:Error in fetching pending request");
    }
    return ReS(res, { message: "Successfully fetched requestList", requestList: JSON.stringify(requestJson) }, 201);
}
module.exports.pendingRequest = pendingRequest;

const removePending = async (req, res) => {
    console.log('7');
    if (!req.user.user_id) {
        logger.error("Request-Controller :User is not authenticated");
        return ReE(res, "Request-Controller:User is not authenticated");
    }
    let err, request;
    [err, request] = await to(Request.findById(req.query.id));
    if (err) {
        return ReE(res, "Request-Controller:Error in fetching request");
    }

    let user;
    [err, user] = await to(User.findById(request.createdBy));
    if (err) {
        return ReE(res, "Request-Controller:User is not fetched");
    }
    user.friends.push(request.deliver_to);
    [err, user] = await to(user.save());
    if (err) {
        return ReE(res, "Request-Controller:User is not saved");
    }

    let user2;
    [err, user2] = await to(User.findById(request.deliver_to));
    if (err) {
        return ReE(res, "Request-Controller:User is not fetched");
    }
    user2.friends.push(request.createdBy);
    [err, user2] = await to(user2.save());
    if (err) {
        return ReE(res, "Request-Controller:User is not saved");
    }

    request.remove({ _id: request._id });
    return ReS(res, { message: "Successfully removed request" }, 201);

}
module.exports.removePending = removePending;

const rejectPending= async(req,res)=>{
    if (!req.user.user_id) {
        logger.error("Request-Controller :User is not authenticated");
        return ReE(res, "Request-Controller:User is not authenticated");
    }
    let err, request;
    [err, request] = await to(Request.findById(req.query.id));
    if (err) {
        return ReE(res, "Request-Controller:Error in fetching request");
    }
    request.remove({ _id: request._id });
    return ReS(res, { message: "Successfully removed request" }, 201);

}
module.exports.rejectPending=rejectPending;