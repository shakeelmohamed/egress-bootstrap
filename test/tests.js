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
        it('should fail when DATABASE_URL is not set', function(done) {
            console.log("DATABASE_URL: ["+process.env.DATABASE_URL+"]", " is type ", typeof(process.env.DATABASE_URL));
            assert.notEqual(process.env.DATABASE_URL, undefined, 'DATABASE_URL is undefined');
            assert.equal(process.env.DATABASE_URL, 'postgres://postgres:@127.0.0.1/nopejs_test');
            done();
        });
    });

    describe('create user table', function() {
        it('should fail if unable to connect to database', function(done) {
            //process.env.DATABASE_URL = 'postgres://postgres:@127.0.0.1/nopejs_test';
            var nope_client = new pg.Client('postgres://postgres:@127.0.0.1/nopejs_test');
            assert.equal(nope_client.user, 'postgres'); //For some reason, client.user is smohamed
            
            nope_client.end();
            done();
        });
        it('should fail when unable to create the user table', function() {
            pg.connect('postgres://postgres:@127.0.0.1/nopejs_test', function(err, nopejs_client, done) {
              if(err) {
                return console.error('error fetching client from pool', err);
              }
              nopejs_client.query('SELECT $1::int AS numbor', ['1'], function(err, result) {
                //call `done()` to release the client back to the pool
                done();
                if(err) {
                  return console.error('error running query', err);
                }
                console.log(result.rows[0].numbor);
                //output: 1
              });
            });
            console.log("Does this work, at least?");
        });
    })
});