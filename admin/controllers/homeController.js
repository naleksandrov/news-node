module.exports = {
	indexGet: (req, res) => {
		res.render('home/index', {title: 'Admin Dashboard'});
	}
};