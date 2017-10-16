const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database : 'news'
});

module.exports =  {
	query: (sql, args) => {
		return new Promise((resolve, reject) => {
			con.query(sql, args, (err, rows) => {
				if (err)
					return reject(err);
				resolve(rows);
			});
		});
	},
	close: () => {
		return new Promise((resolve, reject) => {
			con.end(err => {
				if (err)
					return reject(err);
				resolve(err);
			});
		});
	}
};