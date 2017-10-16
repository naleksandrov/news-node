const news = require('../models/newsModel');
const Pagination = require('../components/Pagination');

module.exports = {
	indexGet: (req, res) => {
		const pageNum = Number(req.params.page) || 1;
		const langId = req.session.language.id;

		news.getNewsCount().then((newsCountResult) => {
			news.getNews(pageNum, 5, langId).then((newsRsult) => {
				const pagination = new Pagination(newsCountResult[0].count, pageNum , 5, '/home/index/');
				res.render('home/index', {
					title: 'Admin News List',
					newsList: newsRsult,
					pagination: pagination.pagination,
				});
			});
		});
	}
};
