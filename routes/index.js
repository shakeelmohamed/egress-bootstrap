exports.init = function (app) {
    var bcrypt = require("bcrypt-nodejs");
    var jade = require("jade");
    var pg = require("pg");

    var config = require("../config");
    var controllerSet = require("../controllers");
    var utils = require("./utils")(app);
    var validators = require("./validators");

    //Lovely controller routing
    var controllers = new controllerSet(utils.getViewData, validators, config);

    app.get("/", controllers.home.get);

    app.get("/404", controllers._404.get);

    app.get("/logout", controllers.logout.get);

    app.get("/login", controllers.login.get);
    app.post("/login", controllers.login.post);

    app.get("/join", controllers.join.get);
    app.post("/join", controllers.join.post);

    // Pass in middleware for pages that require a user to be logged in
    app.get("/account", utils.checkAuth, controllers.account.get);
};