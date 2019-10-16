const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/User.js');
const jwt = require('jsonwebtoken');



const secret = 'mysecrets';
const API_PORT = 3001;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CONNECTION_URL = "mongodb+srv://mm632150409:910909Lmc@cluster0-ampgo.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "tennis";

app.listen(API_PORT,()=>{
	mongoose.connect('mongodb://localhost:27017/tennis', {  useUnifiedTopology: true}, (error, client) => {
		if(error) {
			console.log("error-log:"+error);
			throw error;
		}
		const collection = client.collection("events");
		console.log("Connected to `" + collection + "`!");
	});
});

app.post('/api/authenticate', function(req, res) {
	const { username, email, password } = req.body;
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

app.post('/api/register', function(req, res) {
	const { username, email , password } = req.body;
	const user = new User({ username, email, password });
	user.save(function(err) {
		if (err) {
			res.status(500)
				.send("Error registering new user please try again.");
		} else {
			res.status(200).send("Welcome to the club!");
		}
	});
});

// app.use(cors());

// const router = express.Router();
//
// // this is our MongoDB database
// const dbRoute =
// 	'mongodb+srv://mm632150409:910909Lmc@tennis-ampgo.mongodb.net/test?retryWrites=true&w=majority';
//
// // connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true });
//
// let db = mongoose.connection;
//
// db.once('open', () => console.log('connected to the database'));
//
// // checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//
// // (optional) only made for logging and
// // bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger('dev'));
//
// // this is our get method
// // this method fetches all available data in our database
// router.get('/getData', (req, res) => {
// 	Data.find((err, data) => {
// 		if (err) return res.json({ success: false, error: err });
// 		return res.json({ success: true, data: data });
// 	});
// });
//
// // this is our update method
// // this method overwrites existing data in our database
// router.post('/updateData', (req, res) => {
// 	const { id, update } = req.body;
// 	Data.findByIdAndUpdate(id, update, (err) => {
// 		if (err) return res.json({ success: false, error: err });
// 		return res.json({ success: true });
// 	});
// });
//
// // this is our delete method
// // this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
// 	const { id } = req.body;
// 	Data.findByIdAndRemove(id, (err) => {
// 		if (err) return res.send(err);
// 		return res.json({ success: true });
// 	});
// });
//
// // this is our create methid
// // this method adds new data in our database
// router.post('/putData', (req, res) => {
// 	let data = new Data();
//
// 	const { id, message } = req.body;
//
// 	if ((!id && id !== 0) || !message) {
// 		return res.json({
// 			success: false,
// 			error: 'INVALID INPUTS',
// 		});
// 	}
// 	data.message = message;
// 	data.id = id;
// 	data.save((err) => {
// 		if (err) return res.json({ success: false, error: err });
// 		return res.json({ success: true });
// 	});
// });
//
// // append /api for our http requests
// app.use('/api', router);
//
// // launch our backend into a port
// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
