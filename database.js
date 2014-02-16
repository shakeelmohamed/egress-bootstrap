var db = require("./postgres").connect();

//db.connect();

var query = "select * from users limit 1;";

var q = db.query(query);

q.on("error", function(error) {
    console.log("Database error", error);
});

q.on("row", function(row) {
    console.log(row);
});
q.on("end", function(result) {
    db.end();
});
/*
var drop = "drop table users";

db.client.query(drop, function(err, result) {
    console.log(err);
    console.log(result);
    db.end();
});
*/