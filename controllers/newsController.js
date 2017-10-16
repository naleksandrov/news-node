const news = require('../models/newsModel');

module.exports = {
	indexGet: (req, res) => {
		news.newsDetails(req.params.id, req.session.language.id).then((result) => {
			res.render('details/index', {title: 'news details', newsDetails: result});
		});
	}
};