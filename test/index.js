var assert = require("assert");
var bcrypt = require("bcrypt-nodejs");
var Browser = require("zombie");
var mocha = require("mocha");
var pg = require("pg");

var app = require("../app");
var port = process.env.PORT || 5000;
var server = app.listen(port);
var browser = new Browser();
browser.site = "http://localhost:"+port;

var testuser = {username: "hehehahahoho00001234", email: "nowayjose@donteventhinkaboutit.com", password: "imjustalittletestuser"};

describe("Bcrypt", function(){
    describe("Test user's password", function() {
        it("should match the encrypted password", function() {
            assert( bcrypt.compareSync(testuser.password, bcrypt.hashSync(testuser.password)) );
        });
    });
});


describe("PostgreSQL", function(){
    describe("credentials", function() {
        it("should connect to a database, and query version", function(done) {
            pg.connect(process.env.DATABASE_URL, function (err, client) {
                if(err) {
                    console.log(err);
                    assert.ifError(err, "Unable to connect to database.");
                }
                else {
                    client.query("select version();", function(err, result) {
                        if(err) {
                            assert.ifError(err, "Unable to query PostgreSQL version.");
                            done();
                        }
                        else {
                            assert.equal(true, !!result, "Result object invalid.");
                            assert(result.rows.length > 0, "No Results returned.");
                            assert(result.rows[0].version.length > 0, "PostgreSQL version not returned.");
                            done();
                        }
                    });
                }
            });
        });
    });
});

describe("Application tests:", function() {
    //TODO: each form should be it's own set of tests, make the browser & server vars outside of any set
    describe("Join form", function() {
        it("Should contain all form elements", function(done) {
            browser.visit("/join")
            .then(function() {
                assert.equal(browser.text("h2"), "Join "+app.locals.sitename);
                assert.ok(browser.query("#user"), "Couldn't find user field.");
                assert.ok(browser.query("#email"), "Couldn't find email field.");
                assert.ok(browser.query("#password"), "Couldn't find password field.");
                assert.ok(browser.query("#register"), "Couldn't find join button.");
            })
            .then(done);
        });
        it("Should create a test user via the registration form", function(done) {
            browser.visit("/join", function(){
                browser.fill("user", testuser.username);
                browser.fill("email", testuser.email);
                browser.fill("password", testuser.password);
                browser.pressButton("register", function() {
                    assert.ok(browser.success);
                });
                done();
            });
        });
    });
    describe("Join form", function() {
        it("Should logout", function(done){
            browser.visit("/logout", function(){
                assert.ok(browser.success);
                done();
            });
        });
    });

    describe("Login form", function() {
        it("Should contain all form elements", function(done) {
            browser.visit("/login")
            .then(function() {
                assert.equal(browser.text("h2"), "Login to "+app.locals.sitename);
                assert.ok(browser.query("#user"), "Couldn't find user field.");
                assert.ok(browser.query("#password"), "Couldn't find password field.");
                assert.ok(browser.query("#login"), "Couldn't find login button.");
            })
            .then(done, done);
        });
        it("Should login as a user", function(done) {
            browser.visit("/login", function(){
                browser.fill("user", testuser.username);
                browser.fill("password", testuser.password);
                browser.pressButton("login", function() {
                    assert.ok(browser.success);
                });
                done();
            });
        });
    });
});