var nconf = require("nconf");
var db = require("diskdb");
var express = require("express");
var bodyParser = require("body-parser");
var hndl = require("express-handlebars").create({
	defaultLayout: "main"
});

var routes = require("./routes");

var app = express();
app.engine("handlebars", hndl.engine);
app.set("view engine", "handlebars");

app.set("port", 8081);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

nconf.file("./data/conf.json");

var pathData = nconf.get().data;

console.log("pathData = " + pathData);

nconf.file(pathData);

var survey = nconf.get().survey;

db.connect(__dirname, [ survey.name ]);

routes(app, survey, db);

app.listen(app.get("port"), function() {
	console.log("Servidor corriento en el puerto " + app.get("port") +  "; para terminar presione Ctrl-C");
});
