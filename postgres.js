var pg = require("pg");
var config = require("./config");

function Database() {
    this.config = config.postgres;
    this.client = new pg.Client(config.postgres);
    this.client.on("drain", this.client.end.bind(this.client));

    //This is some encapsulation for syntactical sugar
    this.connect = function() {
        this.client.connect();
        return this.client;
    }
    this.query = function(query, callback) {
        //TODO: sanitize the query
        return this.client.query(query, callback);
    }
    this.end = function() {
        this.client.end();
    }
}

module.exports = new Database();