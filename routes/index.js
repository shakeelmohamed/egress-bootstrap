exports.init = function (app) {
    var ControllerSet = require("../controllers");
    var utils = require("./utils")(app);

    // Lovely controller routing
    var controllers = new ControllerSet(utils.getViewData, app.locals);

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