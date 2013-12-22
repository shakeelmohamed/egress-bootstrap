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

describe('PostgreSQL', function() {
	describe('DATABASE_URL test', function() {
		it('should fail when DATABASE_URL is not set', function() {
			assert.notEqual(process.env.DATABASE_URL, undefined, 'DATABASE_URL is undefined');
		});
	});

	describe('create user table', function() {
		it('should fail when unable to create the user table', function() {
			var entered = false;
			pg.connect(process.env.DATABASE_URL, function (err, client) {
				console.log("CONNECTED");
				entered = true;
				assert.ifError(err);
				assert.equal(true, fs.existsSync('databases/users.sql'));
				client.query(fs.readFileSync('databases/user.sql'), function (err, result) {
					assert.ifError(err);
				});
			});
			assert.equal(true, entered, 'PostgreSQL connection failed.');
		})
	})
});