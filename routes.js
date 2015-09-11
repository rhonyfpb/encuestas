module.exports = function(app) {

	app.get("/", function(req, res) {
		res.json({hola:"mundo"});
	});
	
	// 404
	app.use(function(req, res, next) {
		res.status(404);
		res.render("not-found");
	});
	
	// 500
	app.use(function(error, req, res, next) {
		console.error(error.stack);
		res.status(500);
		res.render("server-error");
	});
};