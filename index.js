var app = require("./app");
var port = process.env.PORT || 5000;

var pg = require("pg");
var fs = require("fs");

pg.connect(process.env.DATABASE_URL, function (err, client) {
    if (err) {
        return console.error("could not connect to postgres", err);
    }
    //TODO: handle registration process, sanitize before doing the insert.
    //TODO: insert query must be run asynch, to get the callback for errors like non-unique values, etc.
    
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

app.listen(port, function() {
    console.log("Listening on " + port);
});