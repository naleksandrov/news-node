const db = require('../components/Database');

module.exports = {
	login: (username) => {
		return db.query(`SELECT * FROM users WHERE username = "${username}"`);
	}
};