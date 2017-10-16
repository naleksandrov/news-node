const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');
const newsController = require('../controllers/newsController');

module.exports = (admin) => {
	admin.get('/user/login', userController.loginGet);

	admin.post('/user/login', userController.loginPost);

	admin.get('/user/logout', userController.logoutGet);

	admin.get(['/', '/home/index'], homeController.indexGet);

	admin.get(['/news/list', '/news/list/:page'], newsController.listGet);

	admin.get(['/news/edit/:id', '/news/edit/:id/:page'], newsController.editGet);

	admin.get('/news/create', newsController.createGet);

	admin.post('/news/create', newsController.createPost);

	admin.post('/news/update', newsController.updatePost);

	admin.post('/news/delete/:id', newsController.deletePost);
};