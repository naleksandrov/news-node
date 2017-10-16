const db = require('../components/Database');

module.exports = {
	getLanguages() {
		return db.query('SELECT * FROM languages');
	}
};