var express = require("express");
var fs = require("fs");
var jade = require("jade");
var db = require("./p");

var routes = require("./routes");
var config = require("./config");
var app = express();

app.configure(function () {
    app.locals(config); // Get site configuration from config.js
    app.locals.pretty = true;
    app.set("views", __dirname + "/jade");
    app.set("view engine", "jade");
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "egress-secret-goes-right-here-now"}));
    app.use(express.static(__dirname + "/public"));
    app.use(app.router);
    app.use(function(req, res){
        res.redirect("/404");
    });
});

routes.init(app);

var checkTableQuery = "select * from information_schema.tables where table_name='users'";

db.connect();
db.query(checkTableQuery, function(err, result) {
    if (err || result.rowCount === 0) {
        console.log("The users table doesn't exist.");
        var createSQL = fs.readFileSync("databases/users.sql", "utf8");
        //db.connect();
        db.query(createSQL, function(err, result) {
            if (err) {
                console.log("ERROR on creating users table:", err);
            }
            else {
                console.log("Created the users table.");
            }
        });
    }
    else {
        console.log("The users table already exists.");
    }
    db.client.end();
});

module.exports = app;

var port = process.env.PORT || config.port;
app.listen(port, function() {
    console.log("Listening on " + port);
});