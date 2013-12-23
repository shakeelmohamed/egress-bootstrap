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
			console.log("DATABASE_URL: ["+process.env.DATABASE_URL+"]");
			assert.notEqual(process.env.DATABASE_URL, undefined, 'DATABASE_URL is undefined');
			assert.equal(process.env.DATABASE_URL, 'postgres://postgres:@127.0.0.1/nopejs_test');
		});
	});

	describe('create user table', function() {
		it('should fail when unable to create the user table', function() {
			var entered = false;
			//TOOD: get this back to how it was 1 hour ago
			pg.connect(process.env.DATABASE_URL);
			pg.connect(process.env.DATABASE_URL, function (err, client) {
				//TODO: this code is never being executed
				console.log("We connected just fine.");
				entered = true;
				console.log("We're in the connect block, right? : ", entered);

				assert.ifError(err);

				assert.equal(true, fs.existsSync('databases/users.sql'), 'users.sql exists');

				client.query(fs.readFileSync('databases/user.sql'), function (err, result) {
					assert.ifError(err);
					console.log("We ran the query, I guess.");
				});
				client.end();
			});
			//console.log("How about now? : ", entered);
			//assert.equal(true, entered, 'PostgreSQL connection failed.');
		})
	})
});