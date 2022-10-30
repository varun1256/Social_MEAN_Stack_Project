const twilio = require('twilio');
const config=require('config');
const accountSid=config.twilio.accountSid;
const authToken=config.twilio.authToken;
const sendfrom=config.twilio.phoneNo;
const client = new twilio(accountSid, authToken);

module.exports.sendOTP=(content,tosend)=>{
client.messages
  .create({
    body: content,
    to: '+91'+tosend, // Text this number
    from:sendfrom, // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
}