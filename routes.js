module.exports = function(app, survey, db) {

	app.get("/", function(req, res) {
		res.render("home", {
			name: survey.name,
			subname: survey.subname
		});
	});

	app.get("/diligenciar", function(req, res) {
		createForm(res, survey);
	});

	app.get("/ver-resultados", function(req, res) {
		var result = db[survey.name].find();
		var lengthResult = result.length;
		console.log("length result = ", lengthResult);

		var resultadoFinal = {}, elemento;
		var j = 0;
		for(; j < survey.elements.length; ) {
			elemento = survey.elements[j++];
			resultadoFinal[elemento.id] = {};
			resultadoFinal[elemento.id]["type"] = elemento.type;
			switch(elemento.type) {
				case "selection":
					var k = 0;
					resultadoFinal[elemento.id]["data"] = {};
					for(; k < elemento.options.length; ) {
						resultadoFinal[elemento.id]["data"][k] = {
							label: elemento.options[k++],
							value: 0
						};
					}
					break;
				case "boolean":
					resultadoFinal[elemento.id]["data"] = {};
					resultadoFinal[elemento.id]["data"][0] = { label: "Sí", value: 0 };
					resultadoFinal[elemento.id]["data"][1] = { label: "No", value: 0 };
					break;
			}
		}

		console.log("resFINAL", JSON.stringify(resultadoFinal));



		var i = 0, element, id, value;
		// se itera por cada uno de los resultados
		for(; i < lengthResult; ) {
			element = result[i++];
			for(id in element) {
				console.log("id", id);
				// si existe el dato
				if(resultadoFinal[id]) {
					console.log("existe");
					switch(resultadoFinal[id].type) {
						case "selection":
							resultadoFinal[id].data[parseInt(element[id])].value++;
							break;
						case "boolean":
							if(element[id] === "true") {
								resultadoFinal[id].data[0].value++;
							} else {
								resultadoFinal[id].data[1].value++;
							}
							break;
					}
				}
			}
		}

		console.log("resFINAL2", JSON.stringify(resultadoFinal));
		console.log(result);
		res.render("result");
	});

	app.post("/process", function(req, res) {
		console.log(req.body);
		db[survey.name].save(req.body);
		res.json({});
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

		return result;
	}

};
