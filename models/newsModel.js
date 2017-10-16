const db = require('../components/Database');

module.exports = {
	getNews: (pageNum = 1, limit = 5, langId = 1) => {
		let start = (pageNum - 1) * limit;
		return db.query(`SELECT news.id, nt.title, nt.short_description, news.source, news.date FROM news
			LEFT JOIN news_translations as nt ON news.id = nt.news_id WHERE nt.language_id = ${langId} ORDER BY news.id DESC LIMIT
	        ${start}, ${limit}`);
	},
	getNewsCount: (languageId = 1) => {
		return db.query(`SELECT COUNT(*) as count FROM news LEFT JOIN news_translations as nt ON news.id = nt.news_id WHERE nt.language_id = ${languageId}`, true);
	},
	newsDetails: (id, languageId = 1) => {
		return db.query(`SELECT * FROM news LEFT JOIN news_translations ON news.id = news_translations.news_id 
		  WHERE news_translations.language_id = ${languageId} AND news.id = ${id}`);
	},
	editNews: (id) => {
		return db.query(`SELECT * FROM news LEFT JOIN news_translations ON news.id = news_translations.news_id WHERE news.id = ${id}`);
	},
	createNews: (params) => {
		return db.query(`INSERT INTO news (date, source) VALUES ("${params.date}", "${params.source}")`).then((result) => {
			let values = [];
			params.title.map((value, i) => {
				let tempArr = [];
				tempArr.push(params.title[i]);
				tempArr.push(params.short_description[i]);
				tempArr.push(params.description[i]);
				tempArr.push(i+1);
				tempArr.push(result.insertId);
				values.push(tempArr);
			});
			return db.query('INSERT INTO news_translations (title, short_description, description, language_id, news_id) VALUES ?', [values]);
		});
	},
	updateNews: (params, isCommonFields) => {
		let query = '';

		if (isCommonFields) {
			query = `UPDATE news SET date= "${params.date}", source= "${params.source}" WHERE id= ${params.newsId}`;
		} else {
			query = `UPDATE news_translations SET title= "${params.title}", short_description= "${params.shortDescription}", description= "${params.description}" WHERE id= ${params.id}`;
		}

		return db.query(query);
	},
	deleteNews: (id) => {
		if (id) {
			return db.query(`DELETE FROM news WHERE id= ${id}`).then(() => {
				return db.query(`DELETE FROM news_translations WHERE news_id= ${id}`);
			});
		}
	}
};