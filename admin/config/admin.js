const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session');

module.exports = (admin) => {
	// Admin view engine setup
	admin.engine('hbs', hbs({
		extname: '.hbs',
		defaultLayout: 'layout',
		layoutsDir: path.join(__dirname, '../views'),
		partialsDir: [
			'admin/views/news',
		],
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
	admin.set('views', path.join(__dirname, '../views'));
	admin.set('view engine', 'hbs');

	// Admin Express Session
	admin.use(session({
		secret: 'secret',
		saveUninitialized: false,
		resave: false
	}));

	// Admin login redirect
	admin.use((req, res, next) => {
		if (!req.session.user && req.url !== '/user/login') {
			res.redirect('/admin/user/login');
		} else {
			next();
		}
	});

	//Load languages
	admin.use((req, res, next) => {
		const languages = require('../../models/languagesModel');
		languages.getLanguages().then((result) => {
			res.locals.languages = result;
			next();
		});
	});

	// Admin global Vars
	admin.use((req, res, next) => {
		res.locals.user = req.session.user || null;
		next();
	});

	// Load admin router
	require('./routes')(admin);
};