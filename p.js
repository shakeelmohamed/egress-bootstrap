var pg = require("pg");
var config = require("./config");

function Database () {
    this.config = config.postgres;
    this.client = new pg.Client(this.config);
    //this.client.on("drain", this.client.end.bind(this.client));
}

Database.prototype.connect = function() {
    this.client.connect();
    return this.client;
}


Database.prototype.query = function(query, callback) {
    //TODO: sanitize query
    return this.client.query(query, callback);
}

Database.prototype.end = function() {
    this.client.end();
}

module.exports = new Database();

/*
var db = new Database();
db.connect();
console.log("connected");

db.end();
console.log("disconnected");
*/