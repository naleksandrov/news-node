const siteController = require('../controllers/siteController');
const homeController = require('../controllers/homeController');
const newsController = require('../controllers/newsController');

module.exports = (app) => {
	app.get(['/', '/home/index' ,'/home/index/:page'], homeController.indexGet);
	app.get('/news/index/:id', newsController.indexGet);
	app.get('/site/setLanguage/:lang/:id', siteController.setLanguage);
};