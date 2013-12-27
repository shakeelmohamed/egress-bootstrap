var pg = require("pg");
var assert = require("assert");
//var zombie = require("zombie");
var mocha = require("mocha");

var app = require("../app");
var port = process.env.PORT || 5000;

describe('Environment tests', function(){
  describe("PostgreSQL database", function() {
    it("should connect", function(done) {
        pg.connect(process.env.DATABASE_URL, function (err, client) {
            if(err)
                console.log(err);
            else {
                client.query("select * from users", function(err, result) {
                    if(err) {
                        assert.ifError(err);
                        done();
                    }
                    else {
                        assert.equal(true, !!result);
                        done();
                    }
                });
            }
        });
    })
  })
});