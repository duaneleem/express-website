var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
	
	/* -------------------------------------------------------
		GMail authentication goes here.  This app won't work
		without it.
	------------------------------------------------------- */
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: '',
			pass: ''
		}
	});

	/* -------------------------------------------------------
		Provide the mail options in this section.
	------------------------------------------------------- */
	var mailOptions = {
		from: 'John Doe <johndoe@outlook.com',
		to: 'ninjaxtreme@gmail.com',
		subject: 'Website Submisson',
		text: 'You have a new submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email + ' Message: ' + req.body.message,
		html: '<p>You got a new submission with the following details</p><ul><li>Name: + ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>' + req.body.message + '</li></ul>'
	};

	/* -------------------------------------------------------
		This will send the email but will give no indication
		of success. Make sure to create a "success" or
		"failure" page.
	------------------------------------------------------- */
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: ' + info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
