var assert = require("assert");
var pg = require("pg");
var fs = require("fs");

describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
      		assert.equal(-1, [1,2,3].indexOf(5));
      		assert.equal(-1, [1,2,3].indexOf(0));
    	})
  	})
});
describe('pg', function() {
	describe('create user table', function() {
		it('should successfully create the user table', function() {
			pg.connect(process.env.DATABASE_URL, function (err, client) {
				assert.ifError(err);
				client.query(fs.readFileSync('databases/user.sql'), function (err, result) {
					assert.ifError(err);
				});
			});
		})
	})
});