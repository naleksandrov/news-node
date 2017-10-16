const user = require('../../models/userModel');

module.exports = {
	loginGet: (req, res) => {
		res.render('login/login', {title: 'Admin login'});
	},
	loginPost: (req, res) => {
		req.checkBody('username', 'Моля въведете потребителско име').notEmpty();
		req.checkBody('password', 'Моля въведете парола').notEmpty();

		req.getValidationResult().then(function(result) {
			if (!result.isEmpty()) {
				res.render('login/login', {title: 'Admin login error', errors: result.array()});
				return;
			}
			const username = req.body.username;
			const password = req.body.password;

			user.login(username).then((result) => {
				if (result.length === 0) {
					res.render('login/login', {
						title: 'Admin login error',
						errors: [{msg: 'Грешно потребителско име'}]
					});
				} else {
					if (result[0].password !== password) {
						res.render('login/login', {
							title: 'Admin login error',
							errors: [{msg: 'Грешнa парола'}]
						});
					} else {
						req.session.user = username;
						res.redirect('/admin/home/index');
					}
				}
			});
		});
	},
	logoutGet: (req, res) => {
		delete req.session.user;
		res.redirect('/admin/user/login');
	}
};