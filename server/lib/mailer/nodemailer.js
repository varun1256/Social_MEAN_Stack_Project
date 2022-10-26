const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'sourav.developer.testing@gmail.com',
		pass: 'tabhshmjqykqdzld'
	}
});

module.exports.sendmail=(details)=>{
let mailDetails = {
	from: 'sourav.developer.testing@gmail.com',
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