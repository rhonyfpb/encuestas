module.exports = function(app, survey, hndl) {

	app.get("/", function(req, res) {
		res.render("home", {
			name: survey.name,
			subname: survey.subname
		});
	});

	app.get("/diligenciar", function(req, res) {
		createForm(res, survey);
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

	function createForm(res, survey) {
		res.render("form", {
			elements: survey.elements,
			helpers: {
				renderControl: renderControl
			}
		});
	}

	function renderControl(obj) {
		var result = "", length, i;

		result += "<div class=\"control\" data-id=\"" + obj.id + "\" data-type=\"" + obj.type + "\">\n";

		result += obj.label ? "<label>" + obj.label + "</label>\n" : "";

		switch(obj.type) {
			case "boolean":
				result += "<div class=\"control-boolean\">\n";
				result += "<span class=\"control-boolean-yes button\">Sí</span>\n";
				result += "<span class=\"control-boolean-no button\">No</span>\n";
				result += "</div>\n";
				break;
			case "selection":
				result += "<div class=\"control-selection\">\n";
				length = obj.options && obj.options.length;
				if(length) {
					i = 0;
					for(; i<length;) {
						result += "<span class=\"control-selection-selector\">&nbsp;</span><span class=\"control-selection-option\">" + (obj.options[i++]) + "</span>\n";
					}
				}
				result += "</div>\n";
				break;
		}

		result += "</div>\n";

		return /*hndl.handlebars.compile(*/result/*)*/;
	}

};
