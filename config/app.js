const express = require('express');
const app = express();
const admin = express();
const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// App view engine setup
app.engine('hbs', hbs({
	extname: '.hbs',
	defaultLayout: 'layout',
	layoutsDir: path.join(__dirname, '../views'),
	helpers: {
		log: (variable) => {
			console.log(variable);
		},
		ifEqual: (v1, v2, options) => {
			if(v1 === v2) {
				return options.fn(this);
			}
			return options.inverse(this);
		}
	}
}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

// Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: false
}));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Express Validator
app.use(expressValidator());

// Set Static Folder
app.use(express.static(path.join(__dirname, '../public')));
app.use('/admin', admin);

// Load languages
app.use((req, res, next) => {
	const languages = require('../models/languagesModel');
	languages.getLanguages().then((result) => {
		res.locals.languages = result;

		if (!req.session.language) {
			req.session.language = {
				name: result[0].language,
				id: Number(result[0].id)
			};
		}
		next();
	});
});

// Global Vars
app.use((req, res, next) => {
	res.locals.language = {
		name: req.session.language.name,
		id: Number(req.session.language.id)
	};
	next();
});

// Load admin module
require('../admin/config/admin')(admin);

// Load app router
require('./routes')(app);

// Handle 404
app.use((req, res) => {
	res.status(404).send('404: Page not Found');
});

module.exports = app;