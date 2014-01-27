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

//The individual test suites are in their own files
require("./bcrypt.js")(testuser, bcrypt, assert);
require("./postgres.js")(testuser, pg, assert);
require("./join_form.js")(testuser, app, browser, assert);
require("./logout.js")(testuser, browser, assert);
require("./login_form.js")(testuser, app, browser, assert);
require("./cleanup.js")(testuser, pg, assert);