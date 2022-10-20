const { User } = require('../models');
const { to, ReE, ReS } = require('../services/util.services');
const logger = require('../lib/logging');

const List = async (req, res) => {
    if (!req.user.user_id) {
        logger.error("Friends-Controller :User is not authenticated");
        return ReE(res, "Friends-Controller:User is not authenticated");
    }
    let user
    [err, user] = await to(User.findById(req.user.user_id));
    if (err) {
        logger.error("Friends-Controller :User is not found");
        return ReE(res, "Friends-Controller:User is not found");
    }
    // for(let i=0;i<user.friends.length;i++){
    //     [err,userdata]=await to(User.findById(user.friends[i]));
    //      friendsList.push(userdata);
    // }
    [err,friendsList]=await to(User.find({'_id':{'$in':user.friends}}).sort({createdAt:-1}));
    if (err) {
        logger.error("Friends-Controller :error in fetching Friends list");
        return ReE(res, "Friends-Controller:error in fetching Friends List");
    }
    return ReS(res, { message: "Successfully fetched friends", friendsList: JSON.stringify(friendsList) }, 201);
}
module.exports.List = List;

