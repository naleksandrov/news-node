module.exports = {
	setLanguage: (req, res) => {
		let returnObj = {
			success: false
		};

		req.session.language.name = req.params.lang;
		req.session.language.id = req.params.id;

		returnObj.success = true;

		res.json(returnObj);
	}
};