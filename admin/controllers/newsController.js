const news = require('../../models/newsModel');
const languages = require('../../models/languagesModel');
const Pagination = require('../../components/Pagination');

module.exports = {
	listGet: (req, res) => {
		const pageNum = Number(req.params.page) || 1;
		const langId = Number(req.query.lang) || 1;

		news.getNewsCount().then((newsCountResult) => {
			news.getNews(pageNum, 10, langId).then((newsRsult) => {
				const pagination = new Pagination(newsCountResult[0].count, pageNum , 10, '/admin/news/list/', `?lang=${langId}`);
				languages.getLanguages().then((langResult) => {
					res.render('news/newsList', {
						title: 'Admin News List',
						newsList: newsRsult,
						langList: langResult,
						pagination: pagination.pagination,
						activePage: pageNum,
						langId: langId
					});
				});
			});
		});
	},
	editGet: (req, res) => {
		const pageNum = Number(req.params.page) || 1;

		news.editNews(req.params.id).then((newsRsult) => {
			languages.getLanguages().then((langResult) => {
				res.render('news/newsEdit', {
					title: 'Admin News Edit',
					newsList: newsRsult,
					langList: langResult,
					isEdit: true,
					prevPage: pageNum
				});
			});
		});
	},
	createGet: (req, res) => {
		languages.getLanguages().then((langResult) => {
			res.render('news/newsCreate', {title: 'Admin News Create', langList: langResult});
		});
	},
	createPost: (req, res) => {
		news.createNews(req.body).then((result) => {
			res.redirect('/admin/news/newsCreate');
		});
	},
	updatePost: (req, res) => {
		let returnObj = {
			success: false
		};
		let paramsArr = [];
		let isCommonFields = false;

		if(req.body.news_id) {
			isCommonFields = true;
			paramsArr = {
				date: req.body.date,
				source: req.body.source,
				newsId: req.body.news_id
			}
		} else {
			paramsArr = {
				title: req.body.title,
				shortDescription: req.body.short_description,
				description: req.body.description,
				id: req.body.id
			}
		}

		news.updateNews(paramsArr, isCommonFields).then((result) => {
			returnObj.success = true;

		});
	},
	deletePost: (req, res) => {
		let returnObj = {
			success: false
		};
		news.deleteNews(req.params.id).then(() => {
			returnObj.success = true;
			res.json(returnObj);
		});
	}
};