var async = require("async");
var express = require("express");
var fs = require("fs");
var jade = require("jade");
var pg = require("pg");

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
    app.use(function (req, res) {
        res.redirect("/404");
    });
});

pg.connect(config.postgres, function (err, client) {
    if (err) {
        return console.error("could not connect to postgres", err);
    }
    var callbackCount = 0;
    async.waterfall([
            function (callback) {
                ++callbackCount;
                var checkTableQuery = "select * from information_schema.tables where table_name='users'";
                client.query(checkTableQuery, callback);
            },
            function (result, callback) {
                ++callbackCount;
                if (result.rowCount === 0) {
                    console.log("The users table doesn't exist.");
                    //Create the table
                    var createSQL = fs.readFileSync("databases/users.sql", "utf8");
                    client.query(createSQL, callback);
                }
                else {
                    callback(true); //This should abort, because we know the table exists at this point
                }
            },
            function (result, callback) {
                ++callbackCount;
                console.log("Created the users table.");
                callback(null);
            }
        ],
        function (err) {
            if (err && err !== true) {
                console.log("ERROR", err, "With callback:", callbackCount);
            }
            console.log("Final callback:", callbackCount);
            //Prevent the connection from hanging
            client.end();
        }
    );
});

routes.init(app);
module.exports = app;

var port = process.env.PORT || config.port;
app.listen(port, function () {
    console.log("Listening on " + port);
});