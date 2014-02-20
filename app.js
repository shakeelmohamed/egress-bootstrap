var async = require("async");
var express = require("express");
var fs = require("fs");
var pg = require("pg");

var routes = require("./routes");
var app = express();

// Set site configuration in config.js
var config = require("./config");
config = getEnvironmentVariables(".env", config);

function getEnvironmentVariables(filepath, existingVariables) {
    var vars = {};

    // Copy over existing variables
    for (var key in existingVariables) {
        vars[key] = existingVariables[key];
    }
    if (fs.existsSync(filepath)) {
        var fileOfVariables = fs.readFileSync(filepath, "utf8").split("\n");
        
        // For every line in the .env file, parse out the key-value pairs
        // and add them to the vars object.
        fileOfVariables.forEach(function (variable) {
            var key = variable.substring(0, variable.indexOf("="));
            var value = variable.substring(variable.indexOf("=") + 1);
            if (key && value) {
                vars[key.replace(" ", "")] = value;
            }
        });
    }
    else {
        console.log("ERROR", filepath, "not found");
        // This should only happen on Travis CI
        if (process.env.DATABASE_URL) {
            vars.DATABASE_URL = process.env.DATABASE_URL;
        }
    }
    
    return vars;
}

app.configure(function () {
    app.locals(config);
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

pg.connect(config.DATABASE_URL, function (err, client) {
    if (err) {
        return console.error("ERROR: Could not connect to postgres", err);
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
                    // Create the table
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
            else {
                console.log("The users table already exists.");
            }
            // Prevent the connection from hanging
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