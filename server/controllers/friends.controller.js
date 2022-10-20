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

    [err, friendsList] = await to(User.find({ '_id': { '$in': user.friends } }).sort({ createdAt: -1 }));
    if (err) {
        logger.error("Friends-Controller :error in fetching Friends list");
        return ReE(res, "Friends-Controller:error in fetching Friends List");
    }
    return ReS(res, { message: "Successfully fetched friends", friendsList: JSON.stringify(friendsList) }, 201);
}
module.exports.List = List;

const Unfriend = async (req, res) => {
    let friend_id = req.query.friend_id;
    if (!req.user.user_id) {
        logger.error("Friends-Controller :User is not authenticated");
        return ReE(res, "Friends-Controller:User is not authenticated");
    }
    //from user side
    let user
    [err, user] = await to(User.findById(req.user.user_id));
    if (err) {
        logger.error("Friends-Controller :User is not found");
        return ReE(res, "Friends-Controller:User is not found");
    }

    let friends1 = []
    for (let i = 0; i < user.friends.length; i++) {
        if (user.friends[i] != friend_id) {
            friends1.push(user.friends[i]);
        }
    }
    let size1 = user.friends.length;
    for (let i = 0; i < size1; i++) {
        user.friends.pop();
    }
    for (let i = 0; i < friends1.length; i++) {
        user.friends.push(friends1[i]);
    }
    [err, user] = await to(user.save());
    if (err) {
        return ReE(res, "Friends-Controller:User is not saved");
    }

    //From friend side
    let user2
    [err, user2] = await to(User.findById(friend_id));
    if (err) {
        logger.error("Friends-Controller :User is not found");
        return ReE(res, "Friends-Controller:User is not found");
    }

    let friends2 = []
    for (let i = 0; i < user2.friends.length; i++) {
        if (user2.friends[i] != req.user.user_id) {
            friends2.push(user2.friends[i]);
        }
    }
    let size2 = user2.friends.length;
    for (let i = 0; i < size2; i++) {
        user2.friends.pop();
    }
    for(let i=0;i<friends2.length;i++){
        user2.friends.push(friends2[i]);
    }
    [err, user2] = await to(user2.save());
    if (err) {
        return ReE(res, "Friends-Controller:User 2 is not saved");
    }

    return ReS(res, { message: "Successfully  Unfriend" }, 201);

}
module.exports.Unfriend = Unfriend;

