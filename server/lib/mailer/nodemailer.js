const nodemailer = require('nodemailer');
const config=require('config');
const mailUser=config.nodemailer.user;
const mailpass=config.nodemailer.pass;

let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: mailUser,
		pass: mailpass
	}
});

module.exports.sendmail=(details)=>{
let mailDetails = {
	from: mailUser,
	to: details.to,
	subject: details.subject,
	text: details.text
};
mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});
}