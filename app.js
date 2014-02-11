//var async = require("async");
var express = require("express");
var jade = require("jade");
var pg = require("pg");

var routes = require("./routes");
var config = require("./config");
var app = express();//= module.exports = express();

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

pg.connect(config.postgres, function (err, client) {
    if (err) {
        return console.error("could not connect to postgres", err);
    }
    
    var checkTableQuery = "select * from information_schema.tables where table_name='users'";

    client.query(checkTableQuery, function (err, result){
        if (err) {
            console.log("The users table doesn't exist.", err);

            var createSQL = fs.readFileSync("databases/users.sql", "utf8");

            client.query(createSQL, function (err, result) {
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
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});