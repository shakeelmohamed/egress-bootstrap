exports.init = function (app) {
    var pg = require('pg'),
    jade = require('jade'),
    bcrypt = require('bcrypt-nodejs'),
    controllerSet = require('../controllers');

    function getViewData (title, pathSuffix, userID, message) {
        // Set app.locals in web.js; this function gets passed around to all controllers
        return {
            sitename: app.locals.sitename,
            author: app.locals.author,
            title: title,
            loc: pathSuffix,
            user: userID,
            msg: message
        };
    }

    function checkAuth(req, res, next) {
        // Function to check if a user is logged in

        //set boolean to true for checking if a user is authorized
        if (!req.session.user_id) {
            //Send user to the login page if they're not authorized
            res.redirect('login');
        }
        else 
            next();
    }

    //Lovely controller routing
    var controllers = new controllerSet(getViewData);

    app.get('/', controllers.home.get);

    app.get('/404', controllers._404.get);

    app.get('/logout', controllers.logout.get);

    app.get('/account', checkAuth, controllers.account.get);

    app.get('/login', controllers.login.get);
    app.post('/login', controllers.login.post);
    
    app.get('/join', controllers.join.get);
    app.post('/join', controllers.join.post);
};