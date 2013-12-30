var express = require("express"),
    jade = require("jade"),
    pg = require("pg"),
    routes = require("./routes");

var app = module.exports = express();

app.configure(function () {
    app.locals({
        sitename: "Nope.js",
        author: "Shakeel Mohamed"
    });
    app.locals.pretty = true;
    app.set("views", __dirname + "/jade");
    app.set("view engine", "jade");
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "Nope.js"}));
    app.use(express.static(__dirname + "/public"));
    app.use(app.router);
    app.use(function(req, res){
        res.redirect("/404");
    });
});

routes.init(app);