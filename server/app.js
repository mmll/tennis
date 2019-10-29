const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/User.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
const response  = require('./exception/response');



const secret = 'mysecrets';
const API_PORT = 3001;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const CONNECTION_URL = "mongodb+srv://mm632150409:910909Lmc@cluster0-ampgo.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "tennis";

app.all('/api/login', function(req, res) {
	const {username, password}  = req.body.user;
	User.findOne({ username }, function(err, user) {
		if (err) {
			console.error(err);
			res.status(500)
				.json({
					error: 'Internal error please try again'
				});
		} else if (!user) {
			res.status(401)
				.json({
					error: 'Incorrect email or password'
				});
		} else {
			user.isCorrectPassword(password, function(err, same) {
				if (err) {
					res.status(500)
						.json({
							error: 'Internal error please try again'
						});
				} else if (!same) {
					res.status(401)
						.json({
							error: 'Incorrect email or password'
						});
				} else {
					// Issue token
					const payload = { username };
					const token = jwt.sign(payload, secret, {
						expiresIn: '1h'
					});
					res.cookie('token', token, { httpOnly: true })
						.sendStatus(200);
				}
			});
		}
	});
});

app.all('/api/register', function(req, res) {
	const {username, email, password}  = req.body.user;
	console.log(username);
	const user = new User({ username, email, password });
	user.save(function(err) {
		if (err) {
			console.log('error----'+ err);
			res.status(500)
				.send(new response.error(err));
		} else {
			res.status(200).send(new response.success('Register success'));
		}
	});
});

app.listen(API_PORT,()=>{
	mongoose.connect('mongodb://localhost:27017/tennis', {  useUnifiedTopology: true}, (error, client) => {
		if(error) {
			console.log("error-log:"+error);
			throw error;
		}
		const collection = client.collection("events");
		console.log(`Listening on port ${API_PORT}`)
	});
});

