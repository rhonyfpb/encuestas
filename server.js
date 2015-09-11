var nconf = require("nconf");
var express = require("express");
var hndl = require("express-handlebars").create({
	defaultLayout: "main"
});
var routes = require("./routes");

var app = express();
app.engine("handlebars", hndl.engine);
app.set("view engine", "handlebars");

app.set("port", 8080);

nconf.file("./data/conf.json");

var pathData = nconf.get().data;

console.log("pathData = " + pathData);

nconf.file(pathData);

var survey = nconf.get().survey;

console.log("survey = " + survey);

routes(app);

app.listen(app.get("port"), function() {
	console.log("Servidor corriento en el puerto " + app.get("port") +  "; para terminar presione Ctrl-C");
});



